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
const ashOfWar = new mongoose.Schema({
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
  affinity: {
    type: String,
    required: true,
  },
  skill: {
    type: String,
    required: true,
  },
  usableWeapons: { // Added field for usable weapon types
    type: [String], // Array of strings representing weapon types
  },
  comment:[commentModel]
});

const AshOfWarSchema = mongoose.model('ashes', ashOfWar);
export default AshOfWarSchema