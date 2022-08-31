import { FC } from "react";
import Subcribe from "../shared/Subcribe";

const Footer: FC = () => {
  return (
    <div className="w-full">
      <Subcribe />
      <div className="w-full flex bg-app text-gray-500 py-10 px-3 lg:px-0 justify-center">
        Copyright © All rights reserved | Blog Kỳ.Smile
      </div>
    </div>
  );
};
export default Footer;
