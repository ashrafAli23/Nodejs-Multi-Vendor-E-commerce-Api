import { Document, model, Schema, Types } from "mongoose";

export interface IWishlist extends Document {
  user: string;
  products: string[];
}

const wishlistSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "Users",
    required: true,
  },
  products: [
    {
      type: Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
});

wishlistSchema.index({ user: 1 }, { unique: true });

export default model<IWishlist>("Wishlist", wishlistSchema);
