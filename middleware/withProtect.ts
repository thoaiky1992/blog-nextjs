import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

type MethodTypes = "GET" | "POST" | "PUT" | "DELETE";

const withProtect = (handler: NextApiHandler, methods: MethodTypes[] = []) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    const session = await getSession({ req });

    // check methods need authenticate
    if (methods.length && methods.includes(method as MethodTypes) && !session) {
      return res.status(401).json({ message: "UnAuthorizated !!!" });
    }

    return handler(req, res);
  };
};

export default withProtect;
