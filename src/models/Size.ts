import { Document, Schema, model } from "mongoose";

export interface ISize extends Document {
  size: string;
  weight?: number; //in gram
  length?: number; //in cm
  height?: number; //in cm
  width?: number; //in cm
}

const sizeSchema = new Schema({
  size: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
  },
  length: {
    type: Number,
  },
  height: {
    type: Number,
  },
  width: {
    type: Number,
  },
});

sizeSchema.index({ size: 1 });

export default model<ISize>("Size", sizeSchema);
