import React from "react";
import Card from "../Card";

const ContentOne = () => {
  return (
    <div
      className="max-w-[70rem] min-h-screen h-full flex flex-col w-full py-8 px-10 lg:px-0"
      id="content1"
    >
      <h1 className="text-5xl font-bold text-slate-800">Content 1</h1>
      <p className="text-gray-500 md:w-2/6 mt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius officiis
        ex obcaecati, eum tempore necessitatibus
      </p>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4  flex-grow items-center justify-center">
        {[1, 2, 3, 4].map((n) => (
          <Card key={n} />
        ))}
      </section>
    </div>
  );
};

export default ContentOne;
