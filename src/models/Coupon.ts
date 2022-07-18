import { model, Schema, Document, Types } from "mongoose";

interface ICoupon extends Document {
  code: string;
  title: string;
  expire: Date;
  usageLimit: number;
  percentageDiscount: number;
  maxCouponAmount: number;
  createdBy?: string;
}

const couponSchema = new Schema({
  code: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  expire: {
    type: Date,
    required: true,
  },
  usageLimit: {
    type: Number,
    required: true,
  },
  percentageDiscount: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: Types.ObjectId,
    ref: "Users",
  },
});

export default model<ICoupon>("Coupon", couponSchema);
