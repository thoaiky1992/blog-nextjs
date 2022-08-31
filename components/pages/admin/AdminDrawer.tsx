import { ADMIN_BANNER, DEFAULT_AVATAR, DRAWER_LIST } from "@/constants";
import { BiCategory } from "react-icons/bi";
import { ImNewspaper } from "react-icons/im";
import { FaUserEdit } from "react-icons/fa";
import Image from "next/image";
import classNames from "classnames";
import { useRouter } from "next/router";
import Link from "next/link";

interface IDrawerItem {
  id: number;
  title: string;
  href: string;
  icon: string;
}

const AdminDrawer = () => {
  const { asPath } = useRouter();
  const getIcon = (icon: string) => {
    switch (icon) {
      case "category":
        return <BiCategory className="w-5 h-5 mr-5" />;
      case "post":
        return <ImNewspaper className="w-5 h-5 mr-5" />;
      case "user":
        return <FaUserEdit className="w-5 h-5 mr-5" />;
      default:
        return <BiCategory className="w-5 h-5 mr-5" />;
    }
  };
  return (
    <div className="w-[300px] h-full shadow-lg shadow-gray-400">
      <div className="avatar flex m-auto w-[80%]">
        <figure className="relative w-full pb-[100%]">
          <Image
            alt="user"
            layout="fill"
            objectFit="cover"
            src={ADMIN_BANNER}
            className="rounded-full"
          />
        </figure>
      </div>
      <div className="w-[80%] m-auto h-[1px] bg-gray-300 rounded-full"></div>
      <div className="w-full m-auto mt-5 flex flex-col">
        {DRAWER_LIST.map((item: IDrawerItem) => (
          <div key={item.id} className="mt-1 py-2 flex items-center ">
            <Link href={item.href}>
              <div
                className={classNames(
                  "flex items-center w-[80%] m-auto  rounded-lg py-2 px-5 hover:shadow-lg hover:shadow-gray-400 border-t-[1px] border-transparent hover:border-slate-100 transition-all ease-in-out duration-300 cursor-pointer",
                  {
                    "bg-gray-300 shadow-lg shadow-gray-400": asPath.includes(
                      item.href
                    ),
                  }
                )}
              >
                {getIcon(item.icon)} <span className="mt-1">{item.title}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AdminDrawer;
