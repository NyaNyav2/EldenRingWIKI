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

const Weapons = new mongoose.Schema({
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
    attack: [{
      name: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    }],
    defence: [{
      name: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    }],
    scalesWith: [{
      name: {
        type: String,
        required: true,
      },
      scaling: {
        type: String,
        required: true,
      },
    }],
    requiredAttributes: [{
      name: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    }],
    category: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
      precision: 53,
    },
    comment:[commentModel]
  });

const WeaponSchema = mongoose.model('Weapons',Weapons)


export default WeaponSchema