import express from "express";
import * as dotenv from "dotenv";
import SpiritAshSchema from "../mongodb/models/Spirit.js";



dotenv.config()

const router = express.Router();

router.route('/').get(async (req, res) => {
    try {
      const weapons = await SpiritAshSchema.find({});
      res.status(200).json({ success: true, data: weapons });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
    }
  });
// Get Ash of War by ID
router.route('/:id').get(async (req, res) => {
  try {
      const { id } = req.params;
      const ashOfWar = await SpiritAshSchema.findById(id);
      
      if (!ashOfWar) {
          return res.status(404).json({ success: false, message: 'SpiritAsh not found' });
      }

      res.status(200).json({ success: true, data: ashOfWar });
  } catch (err) {
      res.status(500).json({ success: false, message: 'Fetching SpiritAsh by ID failed, please try again' });
  }
});

  export default router;