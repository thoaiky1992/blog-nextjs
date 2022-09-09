// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectDB } from "@/libraries/db-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import withProtect from "@/middleware/withProtect";
import fs from "fs";
import { getSession } from "next-auth/react";
import formidable from "formidable";
import { User } from "@/models/user";

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
        if (fields.avatar) {
          const newFileName = new Date().getTime() + ".jpg";
          const newPath = "/images/user/";
          const dir = "./public" + newPath;
          const file = fields.avatar;
          const base64Data = file.replace(/^data:([A-Za-z-+/]+);base64,/, "");

          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
          fs.writeFileSync(dir + newFileName, base64Data, "base64");
          fields.avatar = newPath + newFileName;
        }

        const user = await User.findByIdAndUpdate(id, fields, { new: true });
        res.status(200).json({ success: true, user });
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
