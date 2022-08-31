import mongoose from "mongoose";

export const PostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    title: {
      type: String,
      required: true,
    },
    seo_title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    meta_description: {
      type: String,
      required: true,
    },
    meta_keywords: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { collection: "posts", timestamps: true }
);

PostSchema.index({ name: "text", title: "text" });

export const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);
