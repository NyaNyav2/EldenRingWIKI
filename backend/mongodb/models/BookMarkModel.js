// Bookmark schema
import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  productType: {
    type: String,
    enum: ["ashes", "armors", "sorceries", "spirits", "talismans", "weapons"], // Add more types if needed
    required: true,
  }
});

const Bookmark = mongoose.model("bookmarks", bookmarkSchema);
export default Bookmark;
