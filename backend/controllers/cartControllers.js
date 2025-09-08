import userModel from "../models/userModel.js";

export const addToCart = async (req,res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    const existingItem = userModel.cartItems.find(item => item.id === productId);

    if(existingItem) {
      existingItem.quantity += 1;
    } else {
      userModel.cartItems.push(productId);
    }

    await userModel.save();

    res.json({ success: true, message: 'Added Successfully', cartItems: userModel.cartItems })

  } catch (error) {
    console.log("Error in addToCart controller : ",error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const removeAllFromCart = async (req,res) => {
  try {
    const { productId } = req.body;
    const existingItem = userModel.cartItems.find(item => item.id === productId);

    if(existingItem) {
      existingItem.quantity += 1;
    } else {
      userModel.cartItems.push(productId);
    }

    await userModel.save();

    res.json({ success: true, message: 'Added Successfully', cartItems: userModel.cartItems })
  } catch (error) {
    console.log("Error in removeAllFromCart controller : ",error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const updateQuantity = async (req,res) => {
  try {
    console.log('helllo')
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