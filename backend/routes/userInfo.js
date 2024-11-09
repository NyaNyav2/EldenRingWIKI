import express from "express";
import * as dotenv from "dotenv";
import {v2 as cloudinary} from 'cloudinary';

import User from "../mongodb/models/userModel.js";

dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})


// Add user Info
router.post("/", async (req, res) => {
  const { userId, userName, userGender, userAge, Photo } = req.body;

  try {
    const userPhoto = await cloudinary.uploader.upload(Photo);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Convert age to an integer and trim whitespace from strings
    const normalizedAge = parseInt(userAge);
    const normalizedName = userName.trim();
    const normalizedGender = userGender.trim();

    // Check if the user info already exists
    const existingInfo = user.info.find(
      (info) =>
        info.userName.trim() === normalizedName &&
        info.userGender.trim() === normalizedGender &&
        parseInt(info.userAge) === normalizedAge
    );

    if (existingInfo) {
      return res.status(400).json({ error: "Info already exists" });
    }

    // Add new info if not found
    user.info.push({
      userName: normalizedName,
      userGender: normalizedGender,
      userAge: normalizedAge,
      userPhoto: userPhoto.url,
    });

    await user.save();
    res.status(201).json(user.info);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Edit User Info
router.put("/:userId/:infoId", async (req, res) => {
  const { userId, infoId } = req.params;
  const { userName, userGender, userAge, Photo } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the specific info to update by infoId
    const infoToUpdate = user.info.id(infoId);
    if (!infoToUpdate) {
      return res.status(404).json({ error: "Info not found" });
    }

    // Optional: Update photo only if provided
    let updatedPhotoUrl = infoToUpdate.userPhoto;
    if (Photo) {
      const userPhoto = await cloudinary.uploader.upload(Photo);
      updatedPhotoUrl = userPhoto.url;
    }

    // Update fields with new values
    infoToUpdate.userName = userName || infoToUpdate.userName;
    infoToUpdate.userGender = userGender || infoToUpdate.userGender;
    infoToUpdate.userAge = userAge ? parseInt(userAge) : infoToUpdate.userAge;
    infoToUpdate.userPhoto = updatedPhotoUrl;

    await user.save();
    res.status(200).json(user.info);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router;