import { model, Schema, Document, Types } from "mongoose";

export interface ICoupon extends Document {
  code: string;
  percentageDiscount: number;
  maxCouponAmount: number;
}

const couponSchema = new Schema({
  code: {
    type: String,
    required: true,
  },
  percentageDiscount: {
    type: Number,
    required: true,
  },
  maxCouponAmount:{
	type: Number,
    required: true,
  }
});

export default model<ICoupon>("Coupon", couponSchema);
