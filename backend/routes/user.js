import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import User from "../mongodb/models/userModel.js";
import jwt from 'jsonwebtoken';
import AshOfWarSchema from "../mongodb/models/Ashe.js";
import ArmorSchema from "../mongodb/models/Armors.js";
import SorceriesSchema from "../mongodb/models/Sorceries.js";
import SpiritAshSchema from "../mongodb/models/Spirit.js";
import TalismanSchema from "../mongodb/models/Talisman.js";
import WeaponSchema from "../mongodb/models/Weapons.js";


dotenv.config()
const router = express.Router();
const createToken =(_id)=>{
    return jwt.sign({_id:_id},process.env.SECRET,{expiresIn:'3d'})
}

//login route
router.route('/login').post( async(req,res)=>{
    const {email,password} = req.body
    try{
        const user = await User.login(email,password)

        // create token
        const userID = user._id
        const token = createToken(user._id)
        res.status(200).json({email,token,userID})
    }catch(err){
        res.status(400).json({err:err.message})
    }
})


// signup route
router.route('/signup').post(  async(req,res)=>{
    const {email,password} = req.body
    try{
        const user = await User.signup(email,password)

        // create token
        const userID = user._id
        const token = createToken(user._id)
        res.status(200).json({email,token,userID})
    }catch(err){
        res.status(400).json({err:err.message})
    }
})

// Get User by ID with populated bookmarks
router.route('/:id').get(async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid user ID format' });
    }

    // Retrieve userInfo without bookmarks
    const userInfo = await User.findById(id).select('-bookmarks');

    if (!userInfo) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Fetch bookmarks with product details separately
    const user = await User.findById(id); // Including bookmarks for fetching details
    const bookmarksWithDetails = await Promise.all(
      user.bookmarks.map(async (bookmark) => {
        let product;

        // Fetch product details based on productType
        if (bookmark.productType === "ashes") {
          product = await AshOfWarSchema.findById(bookmark.productId, "name image description");
        } else if (bookmark.productType === "armors") {
          product = await ArmorSchema.findById(bookmark.productId, "name image description");
        } else if (bookmark.productType === "sorceries") {
          product = await SorceriesSchema.findById(bookmark.productId, "name image description");
        } else if (bookmark.productType === "spirits") {
          product = await SpiritAshSchema.findById(bookmark.productId, "name image description");
        } else if (bookmark.productType === "talismans") {
          product = await TalismanSchema.findById(bookmark.productId, "name image description");
        } else if (bookmark.productType === "weapons") {
          product = await WeaponSchema.findById(bookmark.productId, "name image description");
        }

        return product
          ? {
              productType: bookmark.productType,
              productId: bookmark.productId,
              name: product.name,
              image: product.image,
              description: product.description,
            }
          : null;
      })
    );

    // Filter out any null values if products were not found
    res.status(200).json({
      success: true,
      data: {
        userInfo, // userInfo without bookmarks
        bookmarks: bookmarksWithDetails.filter((bookmark) => bookmark !== null), // populated bookmarks
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Fetching User by ID failed, please try again' });
  }
});


export default router;
