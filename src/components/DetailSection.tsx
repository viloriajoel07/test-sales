import React, { FC } from "react";

interface IDetailSectionProps {
  title: string;
  value: string;
}

const DetailSection: FC<IDetailSectionProps> = ({ title, value }) => {
  return (
    <div className="flex flex-col gap-1">
      <h3>{title} :</h3>
      <p className="text-gray-500">{value ?? "N/A"}</p>
    </div>
  );
};

export default DetailSection;
