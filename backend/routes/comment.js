import express from "express";
import * as dotenv from "dotenv";
import AshOfWarSchema from "../mongodb/models/Ashe.js";
import ArmorSchema from "../mongodb/models/Armors.js";
import SorceriesSchema from "../mongodb/models/Sorceries.js";
import SpiritAshSchema from "../mongodb/models/Spirit.js";
import TalismanSchema from "../mongodb/models/Talisman.js";
import WeaponSchema from "../mongodb/models/Weapons.js";


dotenv.config()

const router = express.Router();
// Add a new comment to a product
router.post("/",async(req,res)=>{
    const { userEmail, productId, productType,userComment } = req.body;
    try{
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
    product.comment.push({userEmail,userComment})
    await product.save();
    res.status(201).json(product.comment)
    }catch (err) {
        res.status(500).json({ error: err.message });
      }
})
// Remove a comment from a product 
router.delete("/:userEmail/:productId/:productType/:commentId",async(req,res)=>{
  const { userEmail, productId, productType,commentId } = req.params;
  try{
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
// Filter out the comment
product.comment = product.comment.filter(
  (comment) => !( comment._id.toString() ===commentId&&comment.userEmail === userEmail)
);
await product.save();
  res.json({ message: "Comment deleted", comment: product.comment });
}catch (err) {
  res.status(500).json({ error: err.message });
}
});


export default router;