import mongoose from "mongoose";

export const Categorychema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  { collection: "categories", timestamps: true }
);

export const Category =
  mongoose.models.Category || mongoose.model("Category", Categorychema);
