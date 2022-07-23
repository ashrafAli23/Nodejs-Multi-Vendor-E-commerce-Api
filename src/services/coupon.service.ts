import Coupon, { ICoupon } from "../models/Coupon";
import { NotFoundError } from "../apiResponse/notFoundError";
import { ErrorResponse } from "../apiResponse/errorResponse";

/**
 * @desc    Get Coupon
 * @param   { String } code - Coupon code
 * @return  { Object<Coupon> }
 */
const getCoupon = async (code: string): Promise<ICoupon> => {
  const couponCode = await Coupon.findOne({ code });

  if (!couponCode) {
    throw new NotFoundError("coupon not found");
  }

  return couponCode;
};

/**
 * @desc    Verfiy coupon code
 * @param   { Object } couponCode - couponCode
 * @returns { Object<Coupon> }
 */
const verifyCouponCode = async (couponCode: string): Promise<string> => {
  const coupon = await Coupon.findOne({ code: couponCode });

  if (!coupon) {
    throw new NotFoundError("coupon not found");
  }
  if (coupon.maxCouponAmount === 0) {
    throw new ErrorResponse("coupon expired");
  }

  return "Coupon is available for use";
};

/**
 * @desc    Generate coupon Code
 * @param   { Object }  body - Body data
 * @returns { Object<coupon> }
 */
const generateCouponCode = async (body: any): Promise<ICoupon> => {
  const randomCodeNumber = (): string => {
    let code = "";

    for (let i = 0; i < 12; i++) {
      code += Math.floor(Math.random() * 10);
    }

    return code;
  };

  const couponCode = await Coupon.create({
    code: randomCodeNumber(),
    percentageDiscount: body.percentageDiscount,
    maxCouponAmount: body.maxCouponAmount,
  });

  return couponCode;
};

/**
 * @desc    Delete coupon Code
 * @param   { String } codeId - ID of coupon code
 * @return  { Void }
 */
const deleteCoupontCode = async (codeId: string): Promise<void> => {
  await Coupon.findByIdAndDelete(codeId);
};

export default {
  getCoupon,
  verifyCouponCode,
  generateCouponCode,
  deleteCoupontCode,
};
