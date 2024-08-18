import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Login } from "./Login";
import { toast } from "react-toastify";

export function AddProduct() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("men");
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin token is present in localStorage
    if (!localStorage.getItem("token")) {
      // Redirect to login page if token is not present
      navigate("/login");
    }
  }, [navigate]);

  //   const handleImageUpload = (event) => {
  //     const files = Array.from(event.target.files);
  //     const imagesArray = files.map((file) => URL.createObjectURL(file));
  //     setImages((prevImages) => prevImages.concat(imagesArray));
  //   };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    console.log("Selected files:", files);
    setImages(files);
  };

  const formData = new FormData();
  formData.append("name", productName);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("category", category);
  formData.append("stock", stock);

  console.log("formData before appending files:", formData);
  images.forEach((file) => {
    formData.append("productImages", file);
  });
  console.log("formData after appending files:", formData);

  //   const formData = new FormData();
  //   formData.append("name", productName);
  //   formData.append("description", description);
  //   formData.append("price", price);
  //   formData.append("category", category);
  //   formData.append("stock", stock);
  //   images.forEach((image) => {
  //     formData.append(`productImages`, image);
  //   });

  const addProduct = async () => {
    console.log("formData in addProduct:", formData);
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/admin/addproduct`,
      formData,
      {
        headers: {
          authorization: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      }
    );
    toast.success("Product added successfully.", {
      position: "bottom-right",
      theme: "dark",
    });
  };

  //   const addProduct = async (e) => {
  //     e.preventDefault();
  //     const formData = new FormData();
  //     formData.append("name", productName);
  //     formData.append("description", description);
  //     formData.append("price", price);
  //     formData.append("category", category);
  //     formData.append("stock", stock);

  //     images.forEach((image, index) => {
  //       formData.append(`productImages`, image);
  //     });

  //     try {
  //       const response = await axios.post(
  //         "http://localhost:3000/admin/addproduct",
  //         formData,
  //         {
  //           headers: {
  //             authorization: localStorage.getItem("token"),
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       );
  //       console.log(response);
  //       navigate("/");
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   if (!localStorage.getItem("token")) {
  //     return <div>{navigate("/login")}</div>;
  //   }

  return (
    <div className="mx-28 my-5">
      <h1 className="text-lg font-medium text-center">Add Product</h1>
      <div className="w-2/4 mx-auto my-5 flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="">Product Name</label>
          <input
            type="text"
            className="outline-none border border-stone-500 rounded focus:ring-1 ring-black px-1 py-1"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="">Description</label>
          <input
            type="text"
            className="outline-none border border-stone-500 rounded focus:ring-1 ring-black px-1 py-1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full">
          <div className="flex flex-col gap-1 w-2/4">
            <label htmlFor="">Price</label>
            <input
              type="text"
              className="outline-none border border-stone-500 rounded focus:ring-1 ring-black px-1 py-1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 w-2/4">
            <label htmlFor="">Stock</label>
            <input
              type="text"
              className="outline-none border border-stone-500 rounded focus:ring-1 ring-black px-1 py-1"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-2">
          <label htmlFor="">Select Category:</label>
          <select
            className="border border-black rounded px-2 py-1 ml-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kids</option>
          </select>
        </div>
        <div className="mt-2">
          <label htmlFor="">Upload Images:</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        <div className="flex gap-2 mt-2">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Product Image ${index + 1}`}
              className="h-20 w-20 object-cover rounded"
            />
          ))}
        </div>
        <button
          className="flex justify-center gap-2 items-center w-fu'
         py-2 border border-black hover:bg-neutral-900 rounded mt-5 bg-black text-white font-semibold"
          onClick={(e) => {
            e.preventDefault();
            addProduct();
          }}
        >
          Add Product
        </button>
      </div>
    </div>
  );
}
