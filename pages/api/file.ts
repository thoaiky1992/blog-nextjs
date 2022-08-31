// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { readFileSync } from "fs";
import formidable from "formidable";
import fs from "fs";
import { WEBSITE_URL } from "@/constants";
import withProtect from "@/middleware/withProtect";
export const config = {
  api: {
    bodyParser: false,
  },
};
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "POST":
      const form = formidable({ multiples: true });
      const [_, files]: any = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) return reject(err);
          resolve([fields, files]);
        });
      });

      if (!files.file) {
        return res.status(400).json({ message: "File not found !!!" });
      }
      const newFileName = new Date().getTime() + ".jpg";
      const newPath = "/images/post/";
      const dir = "./public" + newPath;
      const file = files.file;
      const data = fs.readFileSync(file.filepath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(dir + newFileName, data);
      await fs.unlinkSync(file.filepath);
      return res
        .status(200)
        .json({ message: "ok", path: newPath + newFileName });
    default:
      return res.status(200).json({ message: "ok" });
  }
};
export default withProtect(handler, ["POST", "PUT", "DELETE"]);
