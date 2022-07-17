import { model, Document, Schema, Types } from "mongoose";

interface ICart extends Document {
  email: String;
  cartItems: Types.DocumentArray<string | number>;
  totalPrice: number;
  totalQuantity: number;
}

const cartSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    cartItems: [
      {
        product: {
          type: Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price: {
          type: Number,
          required: true,
        },
        sizes: {
          type: Types.ObjectId,
          ref: "Size",
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    totalQuantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<ICart>("Cart", cartSchema);
