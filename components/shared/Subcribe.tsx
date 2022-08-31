import { axiosInstance } from "@/libraries/axios";
import { ChangeEvent, useState, KeyboardEvent } from "react";
import { GrSend } from "react-icons/gr";

const Subcribe = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      handleSubcribe();
    }
  };

  const handleClick = async () => {
    handleSubcribe();
  };

  const handleSubcribe = async () => {
    try {
      const res = await axiosInstance.post("/subcribe", { email });
      if (res.data.message) {
        setMessage(res.data.message);
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
    } catch (error: any) {
      if (error && error.response.data.message) {
        setMessage(error?.response?.data?.message);
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
    }
  };

  return (
    <div className="w-full bg-slate-100 py-20 lg:py-40 mt-10">
      <div className="w-full flex flex-col lg:flex-row  text-gray-500 max-w-screen-lg m-auto px-3 lg:px-0">
        <div className="flex flex-1 flex-col">
          <h1 className="text-2xl font-semibold">Subcribe</h1>
          <h5 className="max-w-[80%]">
            Đăng kí theo dõi trang để nhận được thông báo sớm nhất khi có bài
            viết mới ...
          </h5>
        </div>
        <div className="flex-1 min-h-[50px] flex items-center justify-center flex-col">
          <div className="mt-5 relative w-full text-gray-500 p-2 rounded-xl bg-white shadow-md shadow-gray/20 border-t-[1px] border-slate-50">
            <input
              type="text"
              placeholder="Email ..."
              className="w-full pl-5 pr-14 focus:outline-none"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              onKeyDown={handleKeyDown}
            />
            <div className="absolute right-5  top-[50%] -translate-y-[50%]">
              <GrSend
                className="w-5 h-5 text-gray-200 opacity-60 cursor-pointer"
                onClick={handleClick}
              />
            </div>
          </div>
          <div className="mt-2 min-h-[30px] flex justify-start w-full pl-2">
            {!!message && <h1>{message} </h1>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subcribe;
