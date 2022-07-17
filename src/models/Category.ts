import { Schema, Document, model } from "mongoose";

export interface ICategory extends Document {
  name: string;
  parentId?: string | null;
  description?: string;
  icon?: string;
  isActive: boolean;
}

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    parentId: {
      type: String,
      ref: "Category",
    },
    description: {
      type: String,
    },
    icon: {
      type: String,
    },
    isActive: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

categorySchema.index({ name: 1 }, { unique: true });

export default model<ICategory>("Category", categorySchema);
