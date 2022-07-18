import { Schema, model, Document, Types } from "mongoose";
import { OrderStatus } from "../enum/order.enum";

interface IOrder extends Document {
  totalPrice: number;
  isPaid: boolean;
  addressId: string;
  isDelivered: boolean;
  deliveredAt?: Date;
  paymentMethod: string;
  taxPrice: number;
  shippingPrice: number;
  status: OrderStatus;
}

const orderSchema = new Schema(
  {
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    addressId: {
      type: Types.ObjectId,
      ref: "OrderAddress",
      required: true,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: Object.keys(OrderStatus),
      default: OrderStatus.notProcessed,
    },
  },
  { timestamps: true }
);

orderSchema.index({ addressId: 1 }, { unique: true });

export default model<IOrder>("Order", orderSchema);
