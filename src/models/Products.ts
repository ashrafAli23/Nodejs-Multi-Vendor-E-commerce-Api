import { Schema, model, Document, Types } from "mongoose";

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  price: number;
  priceAfterDiscount?: number;
  quantity: number;
  sold?: number;
  mainImg: string;
  images: [string];
  color?: [string];
  size: [string];
  category: string;
  createdBy: string;
  isOutOfStock?: boolean;
  ratingsAverage:number;
  ratingsQuantity:number;
}

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    priceAfterDiscount: {
      type: Number,
    },
    quantity: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    mainImg: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    color: {
      type: [String],
    },
    size: [
      {
        type: Types.ObjectId,
        ref: "Size",
        required: true,
      },
    ],
    category: {
      type: Types.ObjectId,
      ref: "Category",
      required: true,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "Users",
      required: true,
    },
    isOutOfStock: {
      type: Boolean,
      default: false,
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
  },
  { timestamps: true }
);

productSchema.index({ createdBy: 1 });
productSchema.index({ slug: 1 }, { unique: true });

export default model<IProduct>("Product", productSchema);
