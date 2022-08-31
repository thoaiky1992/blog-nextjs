// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectDB } from "@/libraries/db-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { Post } from "@/models/post";
import withProtect from "@/middleware/withProtect";
import { Types } from "mongoose";
import fs from "fs";
import { getSession } from "next-auth/react";
import formidable from "formidable";
import { ConvertToSlugify } from "@/libraries/slugify";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { method } = req;
  await connectDB();
  switch (method) {
    case "PUT":
      try {
        const session: any = await getSession({ req });

        const form = formidable({ multiples: true });
        const [fields, files]: any = await new Promise((resolve, reject) => {
          form.parse(req, (err, fields, files) => {
            if (err) return reject(err);
            resolve([fields, files]);
          });
        });
        if (fields.image && fields.image.includes("base64")) {
          const newFileName = new Date().getTime() + ".jpg";
          const newPath = "/images/post/";
          const dir = "./public" + newPath;
          const file = fields.image;
          const base64Data = file.replace(/^data:([A-Za-z-+/]+);base64,/, "");

          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
          fs.writeFileSync(dir + newFileName, base64Data, "base64");
          fields.image = newPath + newFileName;
        }
        // add field
        fields.user = session.user._id;
        if (fields.slug) fields.slug = ConvertToSlugify(fields.title);

        const post = await Post.findByIdAndUpdate(id, fields, { new: true });
        res.status(200).json({ success: true, post });
      } catch (error: any) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
      }

      break;
    case "DELETE":
      const post = await Post.findById(new Types.ObjectId(id as string));
      const oldImage = post.image;
      const path = "./public" + oldImage;
      if (fs.existsSync(path)) {
        fs.unlinkSync(path);
      }
      const result = await post.delete();

      res.status(200).json({ success: true, result });

      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
export default withProtect(handler, ["POST", "PUT", "DELETE"]);
