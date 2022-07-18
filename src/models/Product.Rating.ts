import { model, Types, Document, Schema } from "mongoose";

interface IRating extends Document {
  userId: string;
  productId: string;
  rating: number;
  message?: string;
  ratingsAverage: number;
  ratingsQuantity: number;
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
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: 1,
    max: 5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
});

ratingSchema.index({ productId: 1 }, { unique: true });

export default model<IRating>("Rating", ratingSchema);
