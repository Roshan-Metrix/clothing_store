import userModel from "../models/userModel.js";

export const addToCart = async (req,res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    const existingItem = user.cartItems.find(item => item.id === productId);

    if(existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push(productId);
    }

    await user.save();

    res.status(200).json({ success: true, message: 'Added Successfully', cartItems: user.cartItems })

  } catch (error) {
    console.log("Error in addToCart controller : ",error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const removeAllFromCart = async (req,res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    if(!productId) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter((item) => item.id !== productId)
    }

    await user.save;

    res.status(200).json({ success: true, message: 'Remove Successfully', cartItems: user.cartItems })
  } catch (error) {
    console.log("Error in removeAllFromCart controller : ",error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const updateQuantity = async (req,res) => {
  try {
    const { id:productId } = req.params;
    const { quantity } = req.body;
    const user = req.user;
    const existingItem = user.cartItems.find((item) => item.id === productId);

    if(existingItem){
      if(quantity === 0){
        user.cartItems = user.cartItems.filter((item) => item.id !== productId);
        await user.save();
         res.status(200).json({ success: true, message: 'Update Successfully', cartItems: user.cartItems })
      }
      existingItem.quantity = quantity;
      await user.save();
      res.status(200).json({ success: true, message: 'Update Successfully', cartItems: user.cartItems })
    }else{
      res.status(400).json({success:false,message:'Product not found '})
    }
  } catch (error) {
    console.log("Error in updateQuantity controller : ",error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const getCartProducts = async (req,res) => {
 try {
    console.log(hello)
  } catch (error) {
    console.log("Error in getCartProducts controller : ",error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}