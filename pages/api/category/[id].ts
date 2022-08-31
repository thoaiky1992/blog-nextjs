// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectDB } from "@/libraries/db-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import withProtect from "@/middleware/withProtect";
import { Types } from "mongoose";
import { Category } from "@/models/category";
import { ConvertToSlugify } from "@/libraries/slugify";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { method } = req;
  await connectDB();
  switch (method) {
    case "DELETE":
      const deleteResult = await Category.deleteOne({
        _id: new Types.ObjectId(id as string),
      });

      res.status(200).json({ success: true, result: deleteResult });

      break;

    case "PUT":
      const payload = req.body;
      payload.slug = ConvertToSlugify(payload.title);

      const updateResult = await Category.findByIdAndUpdate(id, payload, {
        new: true,
      });

      res.status(200).json({ success: true, result: updateResult });

      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
export default withProtect(handler, ["POST", "PUT", "DELETE"]);
