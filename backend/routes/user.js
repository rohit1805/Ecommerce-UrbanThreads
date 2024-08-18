const express = require("express")
const prisma = require("../db/db")
const jwt = require("jsonwebtoken")
const JWT_SECRET = require("../config")
const { userAuthMiddleware } = require("../middleware/authentication");
const stripe = require("stripe")("sk_test_51OwTyJSEDK3MA6iWx8D6JGlCyjDti12UGrE8d7ODema2NyxJ7DlENaYrYAXamHbIxZ23UPCxuvTj54X6Vlh01HvD00SpTsXhF9");
const router = express.Router()

router.get("/", (req, res) => {
    res.send("this is user's route")
})



router.post("/signup" , async(req, res) => {
    const { email, password, isAdmin } = req.body;
   
    console.log(email);
    console.log(password);

    const emailExists = await prisma.user.findUnique({
        where : {
            email : email
        }
    })

    if(emailExists){
        return res.status(400).json({
            msg : "Email already exists, use different email ID."
        })
    }

    const newUser = await prisma.user.create({
        data : {
            email : email,
            password : password,
            isAdmin : isAdmin
        }
    })

    if(newUser){
        const token = jwt.sign(newUser.email, JWT_SECRET)
        return res.status(200).json({
            msg : "new user created successfully",
            token : token
        });
    } else {
        return res.send("user not created")
    }
})

router.post("/login", async (req,res) => {
    const {email, password} = req.body;

    const user = await prisma.user.findUnique({
        where : {
            email : email
        }
    })

    if(user){
        if(user.password == password){
            const token = jwt.sign(user.email, JWT_SECRET)
            return res.status(200).json({
                msg : "Logging Successfull.",
                token : token
            })
        } else {
            return res.status(400).json({
                msg : "Wrong password."
            })
        }
    } else {
        return res.status(400).json({
            msg : "User not found, check your email."
        })
    }
})

router.post("/profileInfo", userAuthMiddleware, async(req, res) => {
    const email = req.email;
    try {
        const userDetails = await prisma.user.findUnique({
            where: {
                email: email
            },
            select: {
                email: true,
                firstName: true,
                lastName: true,
                dob: true,
                phoneno: true,
                gender: true
            }
        });
        res.status(200).json({
            User_info : userDetails
        })
    } catch (error) {
        console.log("Error while fetching user details : ", error);
        res.status(500).json({
            msg : "Error while fetching user details"
        })
    }
})

router.put("/updateProfile", userAuthMiddleware, async (req, res) => {
    const {firstName, lastName, dob,phoneno, gender} = req.body;
    // console.log(req.username);
    const user = await prisma.user.update({
        where : {
            email : req.email
        },
        data : {
            firstName : firstName,
            lastName : lastName,
            dob : dob,
            phoneno : phoneno,
            gender : gender
        }
    })

    if(user){
        // console.log(user);
        return res.status(200).json({
            msg : "Profile updated succesfully"
        })
    } else {
        return res.status(404).json({
            msg : "user not found"
        })
    }
})

router.post("/addAddress", userAuthMiddleware, async (req, res) => {
    const {firstName, lastName,phoneno, PINcode, city, district, state, address} = req.body;
    const email = req.email;

    try {

        const getUser = await prisma.user.findUnique({
            where: {
                email : email
            }
        });
        const createAddress = await prisma.addresses.create({
            data:{
                userId: getUser.id,
                firstName: firstName,
                lastName: lastName,
                phoneno : phoneno,
                PINcode: PINcode,
                city: city,
                district: district,
                state: state,
                address: address
            }
        });
        res.status(200).json({
            msg : "Address added successfully."
        })
    } catch (error) {
        console.log("Error while adding the address", error);
        res.status(500).json({msg: "Failed to add address"})
    }
})

router.post("/showAddress", userAuthMiddleware, async (req, res) => {
    try {
        const getUser = await prisma.user.findUnique({
            where: {
                email : req.email
            }
        });

        const addresses = await prisma.addresses.findMany({
            where: {
                userId: getUser.id
            }
        });
        res.status(200).json({
            all_addresses : addresses
        })
    } catch (error) {
        console.log("Error while fetching the addresses : ", error);
        res.status(500).json({
            msg : "Failed to fetch the addresses."
        })
        
    }
})

//Endpoint for user to view the products present in the cart
router.post("/showcart", userAuthMiddleware, async (req, res) => {
    const email = req.email;
    try {
        const user = await prisma.user.findUnique({
            where : {
                email : email
            }
        })

        if(!user){
            return res.status(404).json({
                msg:"User not found."
            })
        }

        const cartItems = await prisma.cart.findMany({
            where : {
                userId : user.id
            },
            include : {
                product : {
                    include : {
                        images : {
                            take : 1
                        }
                    }
                }
            }
        })

        res.status(200).json({
            Products : cartItems
        })
    } catch (error) {
        console.log("Error while fetching the products form the cart.", error);
        return res.status(500).json({
            msg : "Failed to load cart products"
        })
    }
})


// Endpoint to show wishlist products
router.post("/showwishlist", userAuthMiddleware, async (req, res) => {
    const email = req.email;
    try {
        const user = await prisma.user.findUnique({
            where : {
                email : email
            }
        })

        if(!user){
            return res.status(404).json({
                msg:"User not found."
            })
        }

        const wishlistedProduct = await prisma.likedProducts.findMany({
            where : {
                userId : user.id
            },
            include : {
                product : {
                    include : {
                        images : {
                            take : 1
                        }
                    }
                }
            }
        })

        res.status(200).json({
            Wishlisted_Products : wishlistedProduct
        })
    } catch (error) {
        console.log("Error while fetching the wishlist products :", error);
        return res.status(500).json({
            msg : "Failed to load wishlisted products"
        })
    }
})

// let products = [];
// let  = [];
// let products = [];
// payment session api using strip 
router.post("/create-checkout-session", userAuthMiddleware, async (req, res)=>{
    const {cartItem} = req.body;
    console.log(cartItem);
    const lineItems = cartItem.map((product) => ({
        price_data:{
            currency: "inr",
            product_data: {
                name : product.product.name,
            },
            unit_amount: product.price * 100,
        },
        quantity:product.quantity
    }));
    
    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items: lineItems,
        mode:"payment",
        success_url:"http://localhost:5173/orderConfirmed",
        cancel_url:"http://localhost:5173/cart",
    })

    res.status(200).json({id:session.id});
})

// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

router.post("/orderConfirmed", userAuthMiddleware, async (req, res) => {
    try {
        const { addressId, totalAmount, status, products } = req.body;
        const email = req.email;
        console.log("Products : ", products);

        // Find the user ID based on the email
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Create a new order
        const order = await prisma.order.create({
            data: {
                userId: user.id,
                addressId,
                totalAmount,
                status
            }
        });

        // Create order items for each product
        for (const product of products) {
            await prisma.orderItem.create({
                data: {
                    orderId: order.id,
                    productId: product.productId,
                    quantity: product.quantity,
                    price: product.price,
                    size : product.size
                }
            });
        }

        res.status(201).json({ message: "Order confirmed successfully" });
    } catch (error) {
        console.error("Error confirming order:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


router.post("/orders" , userAuthMiddleware, async(req, res) => {
    const email = req.email;
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if(!user){
            return res.status(400).json({
                msg: "user not found"
            })
        }

        const orders = await prisma.order.findMany({
            where:{
                userId: user.id
            },
            include:{
                address: true,
                orderItems: {
                    include : {
                        product : {
                            include : {
                                images : {
                                    take : 1
                                }
                            }
                        }
                    }
                }
            }
        })

        res.status(200).json({
            orders : orders
        })
    } catch (error) {
        console.log("Error while fetching orders : ", error);
        res.status(500).json({
            error : "Internal sever error"
        })
    }
})

router.put("/cancelOrder", userAuthMiddleware, async(req, res)=> {
    const email = req.email;

    const {orderId} = req.body;
    try {
        const cancelOrder = await prisma.order.update({
            where:{
                id: orderId
            }, data: {
                status : "Cancelled"
            }
        })
        res.status(200).json({
            msg : "Order Canceled"
        })
    } catch (error) {
        console.log("Error while cancelling the order : ", error);
        res.status(500).json({
            error : "Internal sever error"
        })
    }
})


module.exports = router;