// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = req.query.filepath;
  const imageBuffer = fs.readFileSync("./public" + String(filePath));
  res.setHeader("Content-Type", "image/jpg");
  return res.send(imageBuffer);
}
