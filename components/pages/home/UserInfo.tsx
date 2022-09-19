import Image from "next/image";
import UserImage from "@/public/images/user.jpeg";
import { UserEntity } from "@/entities/user.entity";
import { FC } from "react";
import { DEFAULT_AVATAR } from "@/constants";
import Link from "next/link";

interface UserInfoProps {
  user: UserEntity;
}
const UserInfo: FC<UserInfoProps> = ({ user }) => {
  return (
    <div className="w-full my-20 flex flex-col lg:flex-row text-gray-500 max-w-screen-lg m-auto px-3 lg:px-0 lg:h-[350px]">
      <div className="flex-1 w-full h-full">
        <div className="w-[300px] h-[300px] lg:h-[350px] lg:w-[350px] m-auto lg:m-0 lg:translate-x-[25%] rounded-full relative">
          <Image
            src={`/api/proxy?filepath=${user.avatar}` || DEFAULT_AVATAR}
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
          <span className="font-bold">Công việc:</span> {user.job}
        </div>
        <div className="text-sm lg:text-xl text-slate-700">
          <span className="font-bold">Sở thích:</span> {user.hobbie}
        </div>
        <div className="text-sm lg:text-xl text-slate-700">
          <span className="font-bold">Châm ngôn sống:</span> {user.maxime}
        </div>
        <div className="text-sm lg:text-xl text-slate-700">
          <span className="font-bold">CV: </span>
          <a
            href={`https://cv.thoaiky.com`}
            target="_blank"
            rel="noreferrer"
            className="underline hover:font-medium"
          >
            https://cv.thoaiky.com
          </a>
        </div>
      </div>
    </div>
  );
};
export default UserInfo;
