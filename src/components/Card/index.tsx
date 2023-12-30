import React from "react";

type CardProps = {
  description?: string;
  image?: string;
};

const Card = ({ description, image }: CardProps) => {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="w-full h-56 bg-sky-500 rounded-lg"></div>
      <p className="text-gray-500">
        {description ??
          `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus nesciunt, est quo iure tempore dignissimos nemo repellendus reprehenderit eius maxime.`}
      </p>
    </div>
  );
};

export default Card;
