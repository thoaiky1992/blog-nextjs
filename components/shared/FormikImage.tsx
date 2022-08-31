import { WEBSITE_URL } from "@/constants";
import { ConvertImageDataFromURL } from "@/libraries/convertImageDataFromURL";
import classNames from "classnames";
import { useField } from "formik";
import Image from "next/image";
import {
  ChangeEvent,
  useEffect,
  useRef,
  Ref,
  useImperativeHandle,
  forwardRef,
} from "react";

export interface RefImageObject {
  getValue: Function;
}

interface FormikImageProps {
  name: string;
  defaultValue: string;
  setFieldValue: Function;
}
const FormikImage = (
  { name, defaultValue, setFieldValue }: FormikImageProps,
  ref: Ref<RefImageObject>
) => {
  const [field, meta] = useField({ name });
  const fileRef = useRef<HTMLInputElement>(null);

  const handleOnchangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      let reader = new FileReader();
      reader.onloadend = () => {
        setFieldValue([name], reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleChooseFile = () => {
    fileRef.current?.click();
  };
  const getValue = () => {
    if (fileRef.current?.files) {
      return fileRef.current?.files[0];
    }
    return null;
  };

  useEffect(() => {
    setFieldValue([name], defaultValue);

    if (!!defaultValue) {
      (async () => {
        let response = await fetch(WEBSITE_URL + defaultValue);
        let data = await response.blob();

        let metadata = {
          type: "image/jpeg",
        };
        let file = new File([data], new Date().getTime() + ".jpg", metadata);

        let reader = new FileReader();
        reader.onloadend = () => {
          setFieldValue([name], reader.result);
          console.log(reader.result);
        };
        reader.readAsDataURL(file);
      })();
    }
  }, []);

  useImperativeHandle(ref, () => ({ getValue }));
  return (
    <div>
      <div>
        <input
          className="hidden"
          ref={fileRef}
          type="file"
          name="file"
          accept="image/*"
          onChange={handleOnchangeFile}
        />

        <button
          onClick={handleChooseFile}
          type="button"
          className={classNames(
            "flex items-center cursor-pointer border-2  px-3 py-2 rounded-md",
            { "border-red-500": meta.touched && meta.error }
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>Chọn hình ảnh</span>
        </button>
      </div>
      {meta.touched && meta.error && (
        <div className="text-red-500 text-xs lg:text-xs mt-2">{meta.error}</div>
      )}
      {field.value && (
        <div className="mt-2 w-[300px] h-[200px] rounded-md shadow-lg ">
          <Image
            alt="image"
            width={300}
            height={200}
            src={field.value}
            objectFit="cover"
            className="rounded-md "
          />
        </div>
      )}
    </div>
  );
};
export default forwardRef(FormikImage);
