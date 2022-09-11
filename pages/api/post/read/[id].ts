// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectDB } from "@/libraries/db-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { Post } from "@/models/post";
import withProtect from "@/middleware/withProtect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { method } = req;
  await connectDB();
  switch (method) {
    case "GET":
      try {
        const post = await Post.findByIdAndUpdate(
          id,
          { $inc: { views: 1 } },
          { new: true }
        );

        res.status(200).json({ success: true, post });
      } catch (error: any) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
      }

      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
export default withProtect(handler, ["POST", "PUT", "DELETE"]);
