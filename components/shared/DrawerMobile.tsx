import Logo from "@/public/logo.png";
import { useRef, useState } from "react";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import { HiMenuAlt2 } from "react-icons/hi";
import { useRouter } from "next/router";
import useSWR from "swr";
import { GET_GENRES } from "@/constants";
import { CategoryService } from "@/services/category.service";
import { CategoryEntity } from "@/entities/category.entity";

const DrawerMobile = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const router = useRouter();

  const { data: categories } = useSWR(GET_GENRES, async () => {
    const categoryService = CategoryService.getInstance();
    const { categories } = await categoryService.getMany();
    return categories;
  });

  //prevent sidebar close before adding effects
  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const handleSidebarClose = () => {
    sidebarRef.current?.classList.remove("slideLeftReturn");
    sidebarRef.current?.classList.add("slideLeft");
    overlayRef.current?.classList.remove("animate__fadeIn");
    overlayRef.current?.classList.add("animate__fadeOut");

    setTimeout(() => {
      setShowSidebar(false);
    }, 400);
  };

  const handleDirect = (href: string) => {
    handleSidebarClose();
    setTimeout(() => {
      router.push(href);
    }, 400);
  };

  return (
    <>
      <HiMenuAlt2
        className="text-3xl text-gray-500 mr-3"
        onClick={() => setShowSidebar(true)}
      />
      <Dialog
        className="lg:hidden"
        open={showSidebar}
        onClose={handleSidebarClose}
      >
        {/* backdrop */}
        <Dialog.Overlay
          ref={overlayRef}
          className="animate__fadeIn animate__animated animate__faster fixed inset-0 z-[100]"
          aria-hidden="true"
        />
        <aside
          ref={sidebarRef}
          className={`${
            showSidebar && "slideLeftReturn"
          } magictime absolute-center	 fixed inset-0 z-[999] w-[300px] bg-white p-4 md:w-[40%] shadow-xl`}
        >
          <div className="flex h-full w-full flex-col">
            {/* control sidebar & logo */}
            <div className="absolute-center flex h-fit w-full items-center justify-between">
              <div className="absolute-center relative flex-1 flex justify-start items-center">
                <div
                  className="w-[100px] lg:w-auto flex items-center"
                  onClick={() => handleDirect("/")}
                >
                  <Image src={Logo} alt="logo" className="cursor-pointer" />
                </div>
              </div>
              <ChevronLeftIcon
                className="h-5 w-5 text-gray-500"
                onClick={handleSidebarClose}
              />
            </div>
            {/* sidebar list  */}
            <ul className="mt-10 h-full w-full text-gray-500">
              <li className="border-t-[2px] border-highlight py-2">
                <h3 className="font-secondary text-xl">Thể loại</h3>
              </li>
              <li className="grid grid-cols-2">
                {categories &&
                  categories.map((category: CategoryEntity, index: number) => {
                    return (
                      <div
                        key={index}
                        className="text-[12px] py-3"
                        onClick={() =>
                          handleDirect(
                            "/bai-viet-theo-the-loai/" + category.slug
                          )
                        }
                      >
                        {category.title}
                      </div>
                    );
                  })}
              </li>
              <li className="border-t-[2px] border-highlight py-2">
                <h3
                  className="font-secondary text-xl"
                  onClick={() => handleDirect("/lien-he")}
                >
                  Liên hệ
                </h3>
              </li>
            </ul>
          </div>
        </aside>
      </Dialog>
    </>
  );
};

export default DrawerMobile;
