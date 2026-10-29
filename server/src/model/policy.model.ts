import mongoose, { Schema, Document } from "mongoose";

export interface IPolicy extends Document {
  policyNumber: string;
  customerName: string;
  policyType: string;
  premium: number;
  status: "Active" | "Inactive";
}

const policySchema = new Schema<IPolicy>(
  {
    policyNumber: {
      type: String,
      required: true,
      unique: true,
    },

    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    policyType: {
      type: String,
      required: true,
    },

    premium: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

export const Policy = mongoose.model<IPolicy>(
  "Policy",
  policySchema
);