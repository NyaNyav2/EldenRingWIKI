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
const armors = new mongoose.Schema({
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
  category: {
    type: String,
    required: true,
  },
  dmgNegation: [{
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  }],
  resistance: [{
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  }],
  weight: {
    type: Number,
    required: true,
    precision: 53,
  },
  comment:[commentModel]
});
const ArmorSchema = mongoose.model('armors',armors)
export default ArmorSchema
