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
const talismanSchema = new mongoose.Schema({
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
  effect: {
    type: String,
    required: true,
  },
  comment:[commentModel]
});

const TalismanSchema = mongoose.model('talismans', talismanSchema);
export default TalismanSchema