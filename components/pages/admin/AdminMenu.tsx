import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { DEFAULT_AVATAR, GET_CURRENT_USER } from "@/constants";
import useSWR from "swr";
import { UserService } from "@/services/user.service";

const AdmiMenu = () => {
  const { data: currentUser } = useSWR(GET_CURRENT_USER, async () => {
    const userService = UserService.getInstance();
    const result = await userService.getMany();
    return result[0];
  });

  return (
    <div className="h-[80px] w-full flex items-center justify-end px-5 shadow-[8px_1px_10px_rgba(0,0,0,0.3)]  shadow-gray-400">
      {currentUser && (
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="flex items-center">
            <figure className="relative w-10 h-10">
              <Image
                alt="user"
                layout="fill"
                objectFit="cover"
                src={currentUser?.avatar || DEFAULT_AVATAR}
                className="rounded-full"
              />
            </figure>
            <h5 className=" text-gray-700 ml-3">{currentUser.name}</h5>
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-gray-700"
              aria-hidden="true"
            />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute p-1 right-0 mt-2 w-28 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-gray-400 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm justify-center transition-all ease-in-out duration-300`}
                    onClick={() => signOut()}
                  >
                    Đăng xuất
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      )}
    </div>
  );
};
export default AdmiMenu;
