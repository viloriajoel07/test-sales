"use client";

import React, { FC, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

import { Input, type IInputProps } from "@/components";

interface IInputSearchProps extends IInputProps {
  hasDefaultValue?: boolean;
}

const WAIT_INTERVAL = 300;

const InputSearch: FC<IInputSearchProps> = ({
  name,
  hasDefaultValue = true,
  value,
  ...props
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const nameInput = name ?? "";

  const [currentValue, setCurrentValue] = useState(
    hasDefaultValue
      ? searchParams
          .get(name ?? "")
          ?.toString()
          .split("-")[0] ?? ""
      : ""
  );

  const searchDebounce = useDebouncedCallback(
    (data: { value: string; name: string }) => {
      const { value, name } = data;
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      replace(`${pathname}?${params.toString()}`);
    },
    WAIT_INTERVAL
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCurrentValue(value);
    searchDebounce({ value, name: nameInput });
  };

  return (
    <Input
      name={name}
      onChange={handleInputChange}
      value={value ?? currentValue}
      {...props}
    />
  );
};

export default InputSearch;
