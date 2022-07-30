import { Schema, model, Document, Types } from "mongoose";
import { TokenTypes } from "../enum/token.enum";

export interface IToken extends Document {
  token: string;
  user: string;
  expires: Date;
  type: string;
}

const tokenSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: "Users",
    },
    expires: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IToken>("Tokens", tokenSchema);
