import { useSwiper } from "swiper/react";
import { HiArrowNarrowRight, HiArrowNarrowLeft } from "react-icons/hi";
import { FC } from "react";
import classNames from "classnames";

interface SwiperButtonProps {
  type: "next" | "prev";
  class?: string;
}
const SwiperButton: FC<SwiperButtonProps> = ({ type }) => {
  const swiper = useSwiper();
  const handleNextSlide = async (type: "next" | "prev") => {
    if (type === "next") swiper.slideNext();
    else swiper.slidePrev();
  };
  return (
    <button
      onClick={() => handleNextSlide(type)}
      className={classNames(
        "rounded-lg p-3 w-[50px]  absolute top-[10px] lg:top-[50%] -translate-y-[calc(50%)] lg:-translate-y-[calc(50%_+_50px)] focus:outline-none",
        {
          "right-0 lg:right-2 z-40": type === "next",
          "right-8 lg:left-2 z-50": type === "prev",
        }
      )}
    >
      {type === "next" ? (
        <HiArrowNarrowRight className="h-6 w-6 text-gray-500" />
      ) : (
        <HiArrowNarrowLeft className="h-6 w-6 text-gray-500" />
      )}
    </button>
  );
};
export default SwiperButton;
