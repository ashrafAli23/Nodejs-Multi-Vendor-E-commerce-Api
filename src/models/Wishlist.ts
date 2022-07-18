import { Document, model, Schema, Types } from "mongoose";

interface IWishlist extends Document {
  user: string;
  product: [string];
}

const wishlistSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "Users",
    required: true,
  },
  product: [
    {
      type: Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
});

export default model<IWishlist>("Wishlist", wishlistSchema);
