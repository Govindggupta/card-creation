import express from "express";
import mongoose from "mongoose";
import Product from "../models/products.models.js"

const router = express.Router();

// to take entry form user 
router.post("/", async (req, res) => {
    const product = req.body // user will send this data

    // if user did not enter any of this thing it will show this error 
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all feilds" })
    }


    const newProduct = new Product(product)
    try {
        await newProduct.save()
        res.status(201).json({ success: true, data: newProduct })
    } catch (error) {
        console.error("Error in Create product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" })
    }
});


// to delete a product 
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "product deleted" });
    } catch (error) {
        res.status(200).json({ success: false, message: "Product not found" });
    }
})


// to see all products 
router.get("", async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("error in fetching products: ", error, message);
        res.status(500).json({ success: false, message: "Server Error" })
    }
})


// to edit products 
router.put("/:id", async (req, res) => {
    const { id } = req.params;

    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid ID "})
    }

    try {
        const updateProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, date: updateProduct})
    } catch (error) {
        res.status(500).json({ success: false, message: "server Error" });
    }
})



export default router;