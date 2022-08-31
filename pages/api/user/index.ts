// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectDB } from "@/libraries/db-connect";
import { IUser, User } from "@/models/user";
import { HydratedDocument } from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import * as bcryptjs from "bcryptjs";
import { HASH_SALT } from "@/constants";
import withProtect from "@/middleware/withProtect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  await connectDB();
  switch (method) {
    case "GET":
      const users = await User.find().select("-password").exec();

      res.status(200).json({ success: true, users });
      break;

    case "POST":
      const payload = req.body;
      payload.password = await bcryptjs.hash(payload.password, HASH_SALT);

      const user: HydratedDocument<IUser> = new User(payload);

      await user.save();
      res.status(201).json({ success: true, user });
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
export default withProtect(handler, ["POST", "PUT", "DELETE"]);
