import { model, Types, Document, Schema } from "mongoose";

interface IRating extends Document {
  userId: string;
  productId: string;
  rating: number;
  message?: string;
}

const ratingSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    required: true,
  },
  productId: {
    type: Types.ObjectId,
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

ratingSchema.index({ userId: 1, productId: 1 }, { unique: true });

export default model<IRating>("rating", ratingSchema);
