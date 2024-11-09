import express from "express";
import AshOfWarSchema from "../mongodb/models/Ashe.js";
import ArmorSchema from "../mongodb/models/Armors.js";
import SorceriesSchema from "../mongodb/models/Sorceries.js";
import SpiritAshSchema from "../mongodb/models/Spirit.js";
import TalismanSchema from "../mongodb/models/Talisman.js";
import WeaponSchema from "../mongodb/models/Weapons.js";
import User from "../mongodb/models/userModel.js";

const router = express.Router();

// Add a new bookmark to a user
router.post("/", async (req, res) => {
  const { userId, productId, productType } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
 
    // Validate the product based on type
    let product;
    if (productType === "ashes") {
      product = await AshOfWarSchema.findById(productId);
    } else if (productType === "armors") {
      product = await ArmorSchema.findById(productId);
    } else if (productType === "sorceries") {
      product = await SorceriesSchema.findById(productId);
    } else if (productType === "spirits") {
      product = await SpiritAshSchema.findById(productId);
    } else if (productType === "talismans") {
      product = await TalismanSchema.findById(productId);
    } else if (productType === "weapons") {
      product = await WeaponSchema.findById(productId);
    }

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if the bookmark already exists
    const existingBookmark = user.bookmarks.find(
      (bookmark) => bookmark.productId.toString() === productId && bookmark.productType === productType
    );

    if (existingBookmark) {
      return res.status(400).json({ error: "Bookmark already exists" });
    }

    // Add the new bookmark
    user.bookmarks.push({ productId, productType });
    await user.save();

    res.status(201).json(user.bookmarks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all bookmarks for a user with populated product data
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Manually populate bookmarks with product data based on productType 
    const bookmarksWithDetails = await Promise.all(
      user.bookmarks.map(async (bookmark) => {
        let product;

        // Check the productType and fetch details accordingly
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
          : null; // Return null if product is not found
      })
    );

    // Filter out any null values if products were not found
    res.json(bookmarksWithDetails.filter((bookmark) => bookmark !== null));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove a bookmark from a user
router.delete("/:userId/:productId/:productType", async (req, res) => {
  const { userId, productId, productType } = req.params;
 
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Filter out the bookmark
    user.bookmarks = user.bookmarks.filter(
      (bookmark) => !(bookmark.productId.toString() === productId && bookmark.productType === productType)
    );

    await user.save();
    res.json({ message: "Bookmark deleted", bookmarks: user.bookmarks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
