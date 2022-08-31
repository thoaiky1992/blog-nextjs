import { LAYOUTS } from "@/constants";
import { NextPageWithLayout } from "./_app";
import { HiHome } from "react-icons/hi";
import { BsPhoneVibrateFill } from "react-icons/bs";
import { IoMail } from "react-icons/io5";
const ContactPage: NextPageWithLayout = () => {
  return (
    <div className="w-full max-w-screen-lg m-auto px-3 lg:px-0">
      <div className="w-full py-20">
        <h1 className="uppercase text-2xl lg:text-3xl">Liên hệ</h1>
        <div className="w-full flex mt-10">
          <HiHome className="w-6 h-6 mr-3 mt-[1px]" />
          <div className="flex flex-col">
            <div>27/5G Mỹ Hòa 1, Trung Chánh, Hóc Môn</div>
            <div className=" text-gray-400">Quốc tịch: Việt nam</div>
          </div>
        </div>
        <div className="w-full flex mt-5">
          <BsPhoneVibrateFill className="w-6 h-6 mr-3 mt-[1px]" />
          <div className="flex flex-col">
            <div>(0)777-694-436</div>
            <div className=" text-gray-400">Thứ 2 {`->`} 6 : 9h - 18h</div>
          </div>
        </div>
        <div className="w-full flex mt-5">
          <IoMail className="w-6 h-6 mr-3 mt-[1px]" />
          <div className="flex flex-col">
            <div>[Hòm thư]</div>
            <div className=" text-gray-400">thoaiky1992@gmail.com</div>
          </div>
        </div>
      </div>
    </div>
  );
};
ContactPage.layout = LAYOUTS.BLOG;
export default ContactPage;
