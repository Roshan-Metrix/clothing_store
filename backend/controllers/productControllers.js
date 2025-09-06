import productModel from "../models/productModel.js";
import cloudinary from "../lib/cloudinary.js";
import { redis } from "../lib/redis.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find({}); // find all products
    res.json({ products });
  } catch (error) {
    console.log("Error in getAllProducts controllers : ", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redis.get("featured_products");
    if (featuredProducts) return res.json(JSON.parse(featuredProducts));

    // if not in redis, fetch from mongodb
    // .lean() is gonna return a plain javascript object instead of a mongodb docx, which is good for performance
    featuredProducts = await productModel.find({ isFeatured: true }).lean();

    if (!featuredProducts)
      return res
        .status(404)
        .json({ success: false, message: "No featured products found" });

    // store in redis for future quick access

    await redis.set("featured_products", JSON.stringify(featuredProducts));
    res.json(featuredProducts);
  } catch (error) {
    console.log("Error in getFeaturedProducts controller:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server Error:", error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;

    let cloudinaryResponse = null;

    if (image) {
      await cloudinary.uploader.upload(image, { folder: "products" });
    }
    const product = await productModel.create({
      name,
      description,
      price,
      image: cloudinaryResponse?.secure_url
        ? cloudinaryResponse.secure_url
        : "",
      category,
    });

    res
      .status(201)
      .json({
        success: true,
        message: "Product created successfully",
        product,
      });
  } catch (error) {
    console.log("Error in createProduct controller", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const deleteProduct = async (req,res) => {
  try {
    const product = await productModel.findById(req.params.id);
    
    if(!product) return res.status(404).json({success:false, message:"Product not found"})

      if(product.image){
        const publicId = product.image.split("/").pop().split(",")[0];
        try {
          await cloudinary.uploader.destroy(`products/${publicId}`)
          console.log("Deleted image from cloudinary")
        } catch (error) {
          console.log("Error deleting image from cloudinary",error);
        }
      }

      await productModel.findByIdAndDelete(req.params.id);

      res.json({success: true, message:'Product deleted successfully'})
    } catch (error) {
      console.log("Error in deleteProduct controller",error.message)
      res.status(500).json({success:true,error:error.massage})
    }
}
