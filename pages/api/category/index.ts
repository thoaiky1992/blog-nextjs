// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectDB } from "@/libraries/db-connect";
import { IUser, User } from "@/models/user";
import { HydratedDocument } from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import * as bcryptjs from "bcryptjs";
import { HASH_SALT } from "@/constants";
import { Category } from "@/models/category";
import withProtect from "@/middleware/withProtect";
import { ConvertToSlugify } from "@/libraries/slugify";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  await connectDB();
  switch (method) {
    case "GET":
      const findOptions = JSON.parse((query.findOptions as string) || "{}");

      const categories = await Category.find(findOptions?.filter)
        .select(findOptions?.select)
        .skip(findOptions?.skip)
        .limit(findOptions?.limit)
        .sort(findOptions?.sort)
        .exec();
      const count = await Category.countDocuments();
      res.status(200).json({ success: true, categories, count });
      break;
    case "POST":
      const payload = req.body;
      payload.slug = ConvertToSlugify(payload.title);

      const category = await Category.create(payload);
      res.status(200).json({ success: true, category });
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default withProtect(handler, ["POST", "PUT", "DELETE"]);
