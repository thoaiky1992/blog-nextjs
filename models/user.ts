import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  job: string;
  hobbie: string;
  maxime: string;
  avatar?: string;
}

export const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: { unique: true },
    },
    password: {
      type: String,
      required: true,
    },
    job: {
      type: String,
      required: true,
    },
    hobbie: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "/images/user.jpeg",
    },
    maxime: {
      type: String,
      required: true,
    },
  },
  { collection: "users", timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
