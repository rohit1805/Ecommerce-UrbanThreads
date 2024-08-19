const express = require("express");
const { adminAuthMiddleware } = require("../middleware/authentication");
const prisma = require("../db/db");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const JWT_SECRET = require("../config");
const { log } = require("console");

// const dotenv = require("dotenv");

// dotenv.config({ path: "../.env" });

require("dotenv").config();

//cloudinary configuration
// cloudinary.config({
//   cloud_name: "dlbiw2uy5",
//   api_key: "593582386484499",
//   api_secret: "vtqBeBbM1TzTnbWvlmU7dgwNHx0",
// });

// console.log(" cloudnary api key : ", process.env.CLOUDNARY_API_KEY);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDNARY_API_KEY,
  api_secret: process.env.CLOUDNARY_API_SECRET,
});

router.get("/", (req, res) => {
  res.send("this is admin's route");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + "-" + file.originalname + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

const uploadMiddleware = upload.array("productImages", 5);

router.post("/signup", async (req, res) => {
  console.log("request hit");
  const { username, email, password } = req.body;

  const usernameExists = await prisma.admin.findUnique({
    where: {
      username: username,
    },
  });

  if (usernameExists) {
    return res.status(400).json({
      msg: "Username already taken, give different username.",
    });
  }

  const emailExists = await prisma.admin.findUnique({
    where: {
      email: email,
    },
  });

  if (emailExists) {
    return res.status(400).json({
      msg: "Email already exists, use different email ID.",
    });
  }

  const newAdmin = await prisma.admin.create({
    data: {
      username: username,
      email: email,
      password: password,
    },
  });

  if (newAdmin) {
    const token = jwt.sign(newAdmin.username, JWT_SECRET);
    return res.status(200).json({
      msg: "New admin created successfully",
      token: token,
    });
  } else {
    return res.send("Admin not created");
  }
});

//////////
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const admin = await prisma.admin.findUnique({
    where: {
      email: email,
    },
  });

  if (admin) {
    if (admin.password == password) {
      const token = jwt.sign(admin.email, JWT_SECRET);
      return res.status(200).json({
        msg: "Login Successfull.",
        token: token,
      });
    } else {
      return res.status(400).json({
        msg: "Wrong password.",
      });
    }
  } else {
    return res.status(400).json({
      msg: "Admin not found, check your username.",
    });
  }
});

//Endpoint to add the product and images related to that product in the database
router.post(
  "/addproduct",
  uploadMiddleware,
  adminAuthMiddleware,
  async (req, res) => {
    // const user = await prisma.user.findUnique({
    //     where : {
    //         username : req.username
    //     }
    // })

    // if(!user.isAdmin){
    //     return res.status(401).json({
    //         msg : "You are not authorized as admin."
    //     })
    // }
    console.log(req.body);
    const { name, description, price, category, stock } = req.body;

    //Extracting the product id
    let productId = undefined;

    //save the product details along with image URLs to the database
    try {
      const product = await prisma.product.create({
        data: {
          name,
          description,
          price: parseFloat(price),
          category,
          stock: parseInt(stock),
        },
      });
      productId = product.id;
    } catch (error) {
      console.log("Error while adding the product in the database : ", error);
      return res.status(500).json({
        msg: "Product info not added.",
      });
    }

    //upload files to cloudinary
    // const uploadedImages = await Promise.all(req.files.map(file => cloudinary.uploader.upload(file.path)));
    const uploadedImages = await Promise.all(
      req.files.map((file) => cloudinary.uploader.upload(file.path))
    );

    //delete temporay files from the local backend
    req.files.forEach((file) => fs.unlinkSync(file.path));
    // if (req.files && req.files.productImages) {
    //     req.files.productImages.forEach(file => fs.unlinkSync(file.path));
    //   }

    //Extract images urls from the cloudinary response
    const imageUrls = uploadedImages.map((image) => image.url);
    // console.log(imageUrls);

    const productImagesData = imageUrls.map((imageUrl) => ({
      imageUrl,
      productId,
    }));

    // console.log("Product images data : ", productImagesData);

    console.log("req.files:", req.files);
    if (req.files) {
      console.log("req.files.keys:", Object.keys(req.files));
      if (req.files.productImages) {
        console.log(
          "req.files.productImages.length:",
          req.files.productImages.length
        );
      } else {
        console.log("req.files.productImages is undefined");
      }
    } else {
      console.log("req.files is undefined");
    }

    //save the product image urls in productImages table using the productId
    try {
      const productImages = await prisma.productImage.createMany({
        data: productImagesData,
      });
      // console.log(productImages);
      res.status(200).json({
        msg: `Product details (Product ID : ${productId}) and ${productImages.count} images added successfully in the database.`,
      });
    } catch (error) {
      console.log(
        "Error while adding the product images in the database: ",
        error
      );
      res.status(500).json({
        msg: "Product images not added.",
      });
    }
  }
);

// router.post("/addproduct", uploadMiddleware, adminAuthMiddleware, async (req, res) => {
//     const { name, description, price, category, stock } = req.body;

//     // Extracting the product id
//     let productId = undefined;

//     try {
//         // Save the product details to the database
//         const product = await prisma.product.create({
//             data: {
//                 name,
//                 description,
//                 price: parseFloat(price),
//                 category,
//                 stock: parseInt(stock)
//             }
//         });
//         productId = product.id;
//     } catch (error) {
//         console.log("Error while adding the product in the database : ", error);
//         return res.status(500).json({
//             msg: "Product info not added."
//         });
//     }

//     if (req.files && req.files.length > 0) {
//         // If files are uploaded, save them
//         try {
//             const uploadedImages = await Promise.all(req.files.map(file => cloudinary.uploader.upload(file.path)));

//             // Delete temporary files from the local backend
//             req.files.forEach(file => fs.unlinkSync(file.path));

//             // Extract images urls from the cloudinary response
//             const imageUrls = uploadedImages.map(image => image.url);
//             console.log(imageUrls);

//             const productImagesData = imageUrls.map(imageUrl => ({
//                 imageUrl,
//                 productId
//             }));

//             console.log("Product images data : ", productImagesData);

//             // Save the product image URLs in productImages table using the productId
//             const productImagesResult = await prisma.productImage.createMany({
//                 data: productImagesData
//             });

//             console.log("Product images data : ", productImagesResult);

//             return res.status(200).json({
//                 msg: `Product details (Product ID : ${productId}) and ${productImagesResult.count} images added successfully in the database.`
//             });
//         } catch (error) {
//             console.log("Error while adding the product images in the database: ", error);
//             return res.status(500).json({
//                 msg: "Product images not added."
//             });
//         }
//     } else {
//         // If no files uploaded, just return success message
//         return res.status(200).json({
//             msg: `Product details (Product ID : ${productId}) added successfully in the database.`
//         });
//     }
// });

// router.post("/addproduct", uploadMiddleware, adminAuthMiddleware, async (req, res) => {
//     console.log(req.body);
//     const { name, description, price, category, stock } = req.body;

//     // Check if files are uploaded
//     if (!req.files || req.files.length === 0) {
//         return res.status(400).json({
//             msg: "Images are required."
//         });
//     }

//     try {
//         // Save the product details to the database
//         const product = await prisma.product.create({
//             data: {
//                 name,
//                 description,
//                 price: parseFloat(price),
//                 category,
//                 stock: parseInt(stock)
//             }
//         });
//         const productId = product.id;

//         // Upload images to cloudinary
//         const uploadedImages = await Promise.all(req.files.map(file => cloudinary.uploader.upload(file.path)));

//         // Delete temporary files from the local backend
//         req.files.forEach(file => fs.unlinkSync(file.path));

//         // Extract image URLs from the cloudinary response
//         const imageUrls = uploadedImages.map(image => image.url);
//         console.log(imageUrls);

//         // Save the product image URLs in productImages table using the productId
//         const productImagesData = imageUrls.map(imageUrl => ({
//             imageUrl,
//             productId
//         }));

//         const productImagesResult = await prisma.productImage.createMany({
//             data: productImagesData
//         });

//         console.log("Product images data : ", productImagesResult);

//         return res.status(200).json({
//             msg: `Product details (Product ID : ${productId}) and ${productImagesResult.count} images added successfully in the database.`
//         });
//     } catch (error) {
//         console.log("Error while adding the product and images in the database: ", error);
//         return res.status(500).json({
//             msg: "Product and images not added."
//         });
//     }
// });

// Endpoint to update the product details
// router.put("/updateproduct", adminAuthMiddleware, async(req,res) => {
//     const {}
// })

// Endpoint to delete the product from the database
router.post("/deleteproduct", adminAuthMiddleware, async (req, res) => {
  const { productId } = req.body;
  console.log(productId);
  try {
    await prisma.productImage.deleteMany({
      where: {
        productId: productId,
      },
    });

    await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    res.status(200).json({
      msg: `Product with product id : ${productId} and associated images deleted successfully.`,
    });
  } catch (error) {
    console.log("Error while deleting the product : ", error);
    res.status(500).json({
      msg: "Failed to delete the product.",
    });
  }
});

router.post("/getOrders", adminAuthMiddleware, async (req, res) => {
  const { status } = req.body;
  try {
    const orders = await prisma.order.findMany({
      // where:{
      //     status: status
      // },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phoneno: true,
          },
        },
        address: true,
        orderItems: {
          include: {
            product: {
              include: {
                images: {
                  take: 1,
                },
              },
            },
          },
        },
      },
    });
    res.status(200).json({
      orders: orders,
    });
  } catch (error) {
    console.log("Error while fetching all the orders for admin : ", error);
    res.status(500).json({
      msg: "Internal sever error.",
    });
  }
});

router.put("/updateOrderStatus", adminAuthMiddleware, async (req, res) => {
  const { orderId, status } = req.body;

  try {
    const updateStatus = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: status,
      },
    });
    res.status(201).json({
      msg: "Order status updated successfully.",
    });
  } catch (error) {
    console.log("Error while updating the status : ", error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});

module.exports = router;
