import { IconCheck, IconX } from "@tabler/icons-react";
import clsx from "clsx";
import React, { FC } from "react";

interface ToastProps {
  type: "error" | "success";
}

const Toast: FC<ToastProps> = ({ type }) => {
  const alertColor = {
    error: "bg-red-500",
    success: "bg-green-500",
  }[type];

  const alertIcon = {
    error: <IconX />,
    success: <IconCheck />,
  }[type];

  return (
    <div
      className={clsx(
        "px-6 gap-4 py-1 rounded-lg flex flex-row fixed top-4 right-4 text-white",
        alertColor
      )}
    >
      {alertIcon}
      Save
    </div>
  );
};

export default Toast;
