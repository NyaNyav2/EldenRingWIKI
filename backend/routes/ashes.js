import express from "express";
import * as dotenv from "dotenv";
import AshOfWarSchema from "../mongodb/models/Ashe.js"



dotenv.config()

const router = express.Router();

router.route('/').get(async (req, res) => {
    try {
      const weapons = await AshOfWarSchema.find({});
      res.status(200).json({ success: true, data: weapons });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
    }
  });
// Get Ash of War by ID
router.route('/:id').get(async (req, res) => {
  try {
      const { id } = req.params;
      const ashOfWar = await AshOfWarSchema.findById(id);
      
      if (!ashOfWar) {
          return res.status(404).json({ success: false, message: 'Ash of War not found' });
      }

      res.status(200).json({ success: true, data: ashOfWar });
  } catch (err) {
      res.status(500).json({ success: false, message: 'Fetching Ash of War by ID failed, please try again' });
  }
});

  export default router;