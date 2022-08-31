import Image from "next/image";
import UserImage from "@/public/images/user.jpeg";
import { UserEntity } from "@/entities/user.entity";
import { FC } from "react";

interface UserInfoProps {
  user: UserEntity;
}
const UserInfo: FC<UserInfoProps> = ({ user }) => {
  return (
    <div className="w-full my-20 flex flex-col lg:flex-row text-gray-500 max-w-screen-lg m-auto px-3 lg:px-0 lg:h-[350px]">
      <div className="flex-1 w-full h-full">
        <div className="w-[300px] h-[300px] lg:h-[350px] lg:w-[350px] m-auto lg:m-0 lg:translate-x-[25%] rounded-full relative">
          <Image
            src={UserImage}
            alt={"Kysomaio"}
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center space-y-5 mt-10 lg:mt-0">
        <div className="text-sm lg:text-xl text-slate-700">
          <span className="font-bold">Tên:</span> {user.name}
        </div>
        <div className="text-sm lg:text-xl text-slate-700">
          <span className="font-bold">Ngề nghiệp:</span> {user.job}
        </div>
        <div className="text-sm lg:text-xl text-slate-700">
          <span className="font-bold">Sở thích:</span> {user.hobbie}
        </div>
        <div className="text-sm lg:text-xl text-slate-700">
          <span className="font-bold">Châm ngôn sống:</span> {user.maxime}
        </div>
      </div>
    </div>
  );
};
export default UserInfo;
