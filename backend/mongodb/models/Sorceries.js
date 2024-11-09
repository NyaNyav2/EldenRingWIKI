import mongoose, { Schema } from "mongoose";
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
const sorceries = new mongoose.Schema({
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
      type: {
        type: String,
        required: true,
      },
      cost: {
        type: Number,
        required: true,
      },
      slots: {
        type: Number,
        required: true,
      },
      effects: {
        type: String,
      },
      requires: [{
        name: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
      }],
      comment:[commentModel]
})

const SorceriesSchema = mongoose.model('sorceries',sorceries)

export default SorceriesSchema