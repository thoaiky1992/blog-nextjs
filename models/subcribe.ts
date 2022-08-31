import mongoose from "mongoose";

export const SubcribeSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
  },
  { collection: "subcribes", timestamps: true }
);

export const Subcribe =
  mongoose.models.Subcribe || mongoose.model("Subcribe", SubcribeSchema);
