import Image from "next/image";

interface SwiperImageProps {
  imgSrc: String;
  index?: number;
  key: String;
}

const SwiperImage = ({ imgSrc, index, key }: SwiperImageProps) => {
  return (
    <div
      key={String(key)}
      className="relative z-10 border-t-[1px] border-gray-500 flex animate-scale-image-banner h-[80%] justify-center items-center w-[150px] md:w-[90%] shadow-lg rounded-xl shadow-white"
    >
      <Image
        unoptimized
        className="inset-0 object-cover object-center rounded-xl"
        priority={index === 0}
        alt="image-preview"
        layout="fill"
        src={`/api/proxy?filepath=${imgSrc}`}
      />
    </div>
  );
};
export default SwiperImage;
