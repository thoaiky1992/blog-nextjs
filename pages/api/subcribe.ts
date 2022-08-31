// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectDB } from "@/libraries/db-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import withProtect from "@/middleware/withProtect";
import { Subcribe } from "@/models/subcribe";
import { validateEmail } from "@/libraries/validate-email";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  await connectDB();
  switch (method) {
    case "POST":
      const { email } = req.body;
      if (!email)
        return res
          .status(400)
          .json({ success: false, message: "Bad request !!!!" });

      if (!validateEmail(email)) {
        return res
          .status(400)
          .json({ success: false, message: "Email không đúng định dạng" });
      }

      const isExist = await Subcribe.findOne({ email });
      if (isExist)
        return res
          .status(400)
          .json({ success: false, message: "Email này đã được đăng kí !!!!" });

      await Subcribe.create({ email });
      res
        .status(200)
        .json({ success: true, message: "Đăng kí thành công !!!" });

      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
export default withProtect(handler, ["PUT", "DELETE"]);
