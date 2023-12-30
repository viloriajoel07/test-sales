import React from "react";
import clsx from "clsx";
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const ContentTwo = () => {
  return (
    <div
      className="w-full min-h-screen bg-slate-100 flex justify-center py-16 px-10 lg:px-0"
      id="content2"
    >
      <div className="max-w-[70rem] flex flex-col w-full justify-center items-end">
        <h1 className="text-5xl font-bold text-slate-800">Content 1</h1>
        <p className="text-gray-500 md:w-2/6 mt-2 text-end">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius officiis
          ex obcaecati, eum tempore necessitatibus
        </p>
        <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8  flex-grow place-items-center">
          {[0, 1, 2].map((x) => (
            <div
              key={x}
              className={clsx(
                "flex border-2 border-white flex-col w-full md:w-[16rem] h-[28rem] px-10 py-6",
                {
                  "!border-sky-500": x === 1,
                }
              )}
            >
              <span
                className={clsx("bg-white w-full h-3 mb-4", {
                  "!bg-sky-500": x === 1,
                })}
              ></span>
              {arr.map((m) => (
                <span
                  key={m}
                  className={clsx("bg-white w-full my-2 h-2", {
                    "!bg-sky-500": x === 1,
                  })}
                ></span>
              ))}
              <span
                className={clsx("bg-white w-full mt-2 h-6", {
                  "!bg-sky-500": x === 1,
                })}
              ></span>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default ContentTwo;
