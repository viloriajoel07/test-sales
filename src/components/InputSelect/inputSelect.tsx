"use client";

import React, { FC, useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { useOutsideClick } from "@/hooks/useOutsideClick";

import type { SelectOption } from "@/types/sales";
import { useDebouncedCallback } from "use-debounce";
import { IInputProps, Input } from "..";

interface IInputSelectProps extends IInputProps {
  hasDefaultValue?: boolean;
  propsStorageValue?: "id" | "value";
  idSelected?: (id: string) => void;
  listOptions?: SelectOption[];
}

const WAIT_INTERVAL = 300;

const InputSelect: FC<IInputSelectProps> = ({
  name,
  hasDefaultValue = true,
  listOptions,
  propsStorageValue,
  idSelected,
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
  const [showList, setShowList] = useState(false);
  const [listFiltered, setListFiltered] = useState<SelectOption[]>(
    listOptions ?? []
  );

  const closeOptions = () => {
    setShowList(false);
  };

  const inputContRef = useOutsideClick<HTMLDivElement>(closeOptions);

  const searchDebounce = useDebouncedCallback(
    (data: { value: string; name: string }) => {
      const { value, name } = data;
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      value && setShowList(true);
      replace(`${pathname}?${params.toString()}`);
    },
    WAIT_INTERVAL
  );

  const onSelectedOption = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(nameInput, value.split("-")[0]);

    params.set(`${nameInput}Value`, value.split("-")[1] ?? "");
    idSelected && idSelected(value.split("-")[1] ?? "");
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    if (currentValue) {
      setListFiltered(
        listOptions?.filter((option) =>
          option.value.toLowerCase().includes(currentValue.toLowerCase())
        ) ?? []
      );
      return;
    }
    setListFiltered(listOptions ?? []);
  }, [currentValue, listOptions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCurrentValue(value);
    searchDebounce({ value, name: nameInput });
  };

  return (
    <Input
      containerRef={inputContRef}
      name={name}
      onChange={handleInputChange}
      value={value ?? currentValue}
      {...props}
    >
      {showList && (
        <ul className="w-full absolute top-20 z-20 overflow-y-auto bg-white border rounded-md flex flex-col max-h-52">
          {listFiltered.map((option) => {
            return (
              <li
                key={option.id}
                className="px-6 py-2 hover:bg-slate-100 hover:cursor-pointer"
                onClick={(e) => {
                  setCurrentValue(option.value);
                  closeOptions();
                  onSelectedOption(`${option.value}-${option.id}`);
                }}
              >
                {option.value}
              </li>
            );
          })}

          {listFiltered.length === 0 && (
            <li className="px-6 py-2 text-gray-400">
              No se encontraron resultados
            </li>
          )}
        </ul>
      )}
    </Input>
  );
};

export default InputSelect;
