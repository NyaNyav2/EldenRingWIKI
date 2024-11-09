import mongoose from "mongoose";
const commentModel = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  userComment: {
    type: String,
    required: true,
  },
});
const spiritAshSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  fpCost: {
    type: Number,
    required: true,
  },
  hpCost: {
    type: Number,
    required: true,
  },
  effect: {
    type: String,
  },
  comment:[commentModel]
});

const SpiritAshSchema = mongoose.model('spirits', spiritAshSchema);
export default SpiritAshSchema