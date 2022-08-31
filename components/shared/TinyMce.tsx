import { TINYMCE_API_KEY, WEBSITE_URL } from "@/constants";
import { axiosInstance } from "@/libraries/axios";
import { Editor } from "@tinymce/tinymce-react";
import classNames from "classnames";
import { useField } from "formik";
import { FC, useEffect, useRef, useState } from "react";

interface TinyMceInstanceProps {
  initialValue?: string;
  setValue: Function;
  name: string;
}

const TinyMceInstance: FC<TinyMceInstanceProps> = ({
  initialValue = "",
  setValue,
  name,
}) => {
  const ref = useRef<any>();
  const [field, meta] = useField({ name });
  const [defaultValue, setDefaultValue] = useState("");
  const handleUpload = async (blobInfo: any, progress: any) =>
    new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", blobInfo.blob(), blobInfo.filename());
      axiosInstance.post("/file", formData).then((res) => {
        resolve(res.data.path);
      });
    });

  const TINYMCE_CONFIG: any = {
    height: "580px",
    plugins: "tinydrive image link media emoticons table lists",
    menubar: "file edit insert format tools table tc help",
    toolbar:
      "language undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify lineheight | bullist numlist outdent indent | forecolor backcolor | removeformat emoticons | media image",
    // content_css: 'document',
    content_style: "p, ol, ul { margin: 0; pading: 0 }",
    language: "vi",
    images_upload_handler: handleUpload,
  };

  useEffect(() => {
    // a real application might do a fetch request here to get the content
    setTimeout(() => setDefaultValue(() => initialValue), 500);
    // if (ref.current) {
    //   setTimeout(() => {
    //     ref.current.setContent("<p>hello</p>");
    //   }, 500);
    // }
  }, []);
  return (
    <div className="-wufll">
      <div
        className={classNames("rounded-[10px] ring-2 ring-transparent shadow", {
          " !ring-red-500": meta.error && meta.touched,
        })}
      >
        <Editor
          apiKey={TINYMCE_API_KEY}
          onInit={(evt, editor) => (ref.current = editor)}
          initialValue={defaultValue}
          init={TINYMCE_CONFIG}
          textareaName="body"
          tagName="body"
          onEditorChange={(newText) => setValue([name], newText)}
        />
      </div>
      {meta.touched && meta.error && (
        <div className="text-red-500 text-xs lg:text-xs mt-2">{meta.error}</div>
      )}
    </div>
  );
};

export default TinyMceInstance;
