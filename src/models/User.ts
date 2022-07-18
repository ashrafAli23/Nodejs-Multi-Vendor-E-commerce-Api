import { Schema, model, Document, Types } from "mongoose";
import bcrypt from "bcrypt";
import { UserRole } from "../enum/role.enum";

export interface IUser extends Document {
  name: string;
  email: string;
  address?: string;
  password: string;
  role: UserRole;
  photo?: string;
  phone?: string;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    address: {
      type: Types.ObjectId,
      ref: "Address",
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.keys(UserRole),
      default: UserRole.user,
    },
    photo: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 }, { unique: true });

// hash password
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default model<IUser>("Users", userSchema);
