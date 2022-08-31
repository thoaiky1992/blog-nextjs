import { FieldHookConfig, useField } from "formik";
import { ChangeEvent, ClassAttributes, FC, InputHTMLAttributes } from "react";
import { FieldProps } from "formik";
import classNames from "classnames";

interface FormikInputProps {
  type?: string;
}

const FormikInput: FC<
  FormikInputProps &
    InputHTMLAttributes<HTMLInputElement> &
    ClassAttributes<HTMLInputElement> &
    FieldHookConfig<string>
> = ({ type = "text", ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      {type === "textarea" ? (
        <textarea
          {...field}
          placeholder={props.placeholder}
          className={classNames(props.className, {
            "!border-red-500 !ring-red-500 !ring-1": meta.touched && meta.error,
          })}
        />
      ) : (
        <input
          type={type}
          {...field}
          {...props}
          className={classNames(props.className, {
            "!border-red-500 !ring-red-500 !ring-1": meta.touched && meta.error,
          })}
        />
      )}

      {meta.touched && meta.error && (
        <div className="text-red-500 text-xs lg:text-xs mt-2">{meta.error}</div>
      )}
    </>
  );
};
export default FormikInput;
