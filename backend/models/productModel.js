import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type:Number,
        min:0,
        require:true
    },
    image:{
        type: String,
        required: [true, 'Image is required']
    },
    category:{
        type: String,
        required: true
    },
    isFeatured:{
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const productModel =
  mongoose.models.product || mongoose.model('Product', productSchema);

export default productModel;
