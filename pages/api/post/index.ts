// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectDB } from "@/libraries/db-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { Post } from "@/models/post";
import withProtect from "@/middleware/withProtect";
import formidable from "formidable";
import fs from "fs";
import { getSession } from "next-auth/react";
import { ConvertToSlugify } from "@/libraries/slugify";
export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  await connectDB();
  switch (method) {
    case "GET":
      try {
        const findOptions = JSON.parse((query.findOptions as string) || "{}");

        const posts = await Post.find(findOptions?.filter)
          .select(findOptions?.select)
          .skip(findOptions?.skip)
          .limit(findOptions?.limit)
          .sort(findOptions?.sort)
          .populate(findOptions?.populate)
          .exec();
        const count = await Post.countDocuments();
        res.status(200).json({ success: true, posts, count });
      } catch (error) {
        res.status(500).json({ success: false });
      }

      break;
    case "POST":
      try {
        const session: any = await getSession({ req });

        const form = formidable({ multiples: true });
        const [fields, files]: any = await new Promise((resolve, reject) => {
          form.parse(req, (err, fields, files) => {
            if (err) return reject(err);
            resolve([fields, files]);
          });
        });
        if (fields.image) {
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
        fields.slug = ConvertToSlugify(fields.title);

        const post = await Post.create(fields);
        res.status(200).json({ success: true });
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
