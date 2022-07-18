import { Schema, Document, model, Types } from "mongoose";

interface IAddress extends Document {
  name: string;
  phone: string;
  address: string;
  email: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

const addressSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 50,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    min: 10,
    max: 13,
  },
  address: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 50,
  },
  email: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
});

export default model<IAddress>("Address", addressSchema);
