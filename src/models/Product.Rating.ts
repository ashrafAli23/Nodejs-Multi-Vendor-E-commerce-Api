import { model, Types, Document, Schema } from "mongoose";

export interface IRating extends Document {
  userId: string;
  productId: string;
  rating: number;
  message?: string;
}

const ratingSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: "Users",
    required: true,
  },
  productId: {
    type: Types.ObjectId,
    ref: "Product",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  message: {
    type: String,
  },
});

ratingSchema.index({ productId: 1, userId: 1 });

export default model<IRating>("Rating", ratingSchema);
