import express from "express";
import * as dotenv from "dotenv";
import armorSchema  from "../mongodb/models/Armors.js";



dotenv.config()

const router = express.Router();

router.route('/').get(async (req, res) => {
    try {
      const armors = await armorSchema.find({});
      res.status(200).json({ success: true, data: armors });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
    }
  });

// Get armor by ID
router.route('/:id').get(async (req, res) => {
  try {
      const { id } = req.params;
      const armor = await armorSchema.findById(id);
      
      if (!armor) {
          return res.status(404).json({ success: false, message: 'Armor not found' });
      }

      res.status(200).json({ success: true, data: armor });
  } catch (err) {
      res.status(500).json({ success: false, message: 'Fetching armor by ID failed, please try again' });
  }
});


  export default router;