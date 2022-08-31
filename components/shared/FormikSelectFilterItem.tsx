import { useField } from "formik";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import Select from "react-select";

export type SelectOptionType = {
  value: string;
  label: string;
};

interface SelectFilterItemProps {
  name: string;
  options: SelectOptionType[];
  instancdId: string;
  isClearable: boolean;
  setFieldValue: Function;
  isSearchable?: boolean;
}

const SelectFilterItem: FC<SelectFilterItemProps> = ({
  options,
  instancdId,
  isClearable,
  name,
  setFieldValue,
  isSearchable = false,
}) => {
  // console.log(options);

  // console.log(instancdId);

  const router = useRouter();
  const [defaultValue, setDefaultValue] = useState<SelectOptionType | null>(
    () =>
      options.filter((item: SelectOptionType) => item.value === instancdId)[0]
  );
  const handleChange = (values: SelectOptionType) => {
    setDefaultValue(() => ({ ...defaultValue, ...values }));
    setFieldValue([name], values.value);
  };

  const [field, meta] = useField({ name });

  useEffect(() => {
    if (options.length) {
      setDefaultValue(
        () =>
          options.filter(
            (item: SelectOptionType) => item.value === instancdId
          )[0]
      );
    }
  }, [options, instancdId]);

  return (
    <>
      <Select
        name={name}
        key={instancdId}
        defaultValue={defaultValue}
        value={defaultValue}
        isMulti={false}
        placeholder={"Thể loại"}
        isClearable={isClearable}
        isSearchable={isSearchable}
        options={options}
        classNamePrefix="select"
        //@ts-ignore
        onChange={handleChange}
        instanceId={instancdId}
        hideSelectedOptions={false}
        noOptionsMessage={() => "Không tồn tại"}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: "#d1d5db",
            primary25: "#d1d5db",
            primary75: "#d1d5db",
            primary50: "#d1d5db",
            primary20: "#d1d5db",
          },
        })}
        styles={{
          container: (styles) => ({
            ...styles,
            width: "100%",
            zIndex: "99",
          }),
          option: (provided, state) => {
            return {
              ...provided,
              color: state.isSelected ? "#000" : "#000",
              margin: "5px 0px",
              borderRadius: "5px",
              cursor: "pointer",
            };
          },
          control: (provided) => {
            return {
              ...provided,
              backgroundColor: "#fff",
              width: "100%",
              minWidth: "100%",
              color: "#000",
              boxShadow: "0px 4px 10px -2px #d1d5db",
              border: `2px solid ${
                meta.error && meta.touched ? "#ef4446" : "white"
              }`,
              minHeight: `${isSearchable ? "50px" : "52px"}`,
              "&:hover": {
                border: "2px solid white",
              },
              cursor: "pointer",
              borderRadius: "6px",
              marginTop: "-1px",
            };
          },
          input: (provided) => {
            return {
              ...provided,
              color: "#000",
              padding: "8px 4px",
            };
          },
          singleValue: (provided) => {
            return {
              ...provided,
              color: "#000",
              borderRadius: "20px",
            };
          },
          menu: (provided) => {
            return {
              ...provided,
              backgroundColor: "#fff",
              boxShadow: "0px 0px 5px #d1d5db",
              padding: "10px",
            };
          },
          menuPortal: (provided) => ({
            ...provided,
            zIndex: 9999,
          }),
        }}
      />
      {meta.touched && meta.error && (
        <div className="text-red-500 text-xs lg:text-xs mt-2">{meta.error}</div>
      )}
    </>
  );
};

export default SelectFilterItem;
