"use client";

import React, { FC } from "react";
import clsx from "clsx";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Span } from "next/dist/trace";

export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  contentClassName?: string;
  containerRef?: React.RefObject<HTMLDivElement>;
  label?: string;
}

const Input: FC<IInputProps> = ({
  label,
  required,
  contentClassName,
  className,
  name,
  onChange,
  value,
  children,
  containerRef,
  ...props
}) => {
  return (
    <div
      className={clsx("flex flex-col gap-1 w-fit relative", contentClassName)}
      ref={containerRef}
    >
      {label && (
        <label className="text-slate-600 text-sm">
          {label} {required && <span className="text-red-500 pl-1">*</span>}
        </label>
      )}
      <input
        required={required}
        onChange={onChange}
        value={value}
        name={name}
        type="text"
        className={clsx(
          "px-4 py-2 bg-white border outline-1 outline-sky-500",
          className
        )}
        {...props}
      />
      {children}
    </div>
  );
};

export default Input;
