import clsx from "clsx";
import Link from "next/link";

const list = ({ sales }: { sales: any }) => {
  return (
    <ul className="flex w-full flex-col overflow-hidden rounded-md border border-black/20 bg-white text-sm mt-6">
      {sales?.map((item: any, index: number) => {
        return (
          <Link
            href={`/auth/sales/${item.id}`}
            key={item.id}
            className={clsx(
              "flex cursor-pointer items-center justify-between border-gray-400/60 bg-white px-4 py-3 transition-all duration-300 hover:bg-sky-100 ",
              {
                "border-b border-black/10": index !== sales.length - 1,
              }
            )}
          >
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <p className="mb-1 overflow-hidden text-ellipsis font-semibold dark:font-normal">
                  {item.client}
                </p>
                <span className="text-xs text-gray-500 dark:text-gray-500">
                  {`${item.created_at}`}
                </span>
              </div>
            </div>
            <p
              className={clsx(
                "whitespace-nowrap text-base font-semibold dark:font-normal text-green-500"
              )}
            >
              $ {item.total.toLocaleString("es-CO")}
            </p>
          </Link>
        );
      })}
      {sales?.length === 0 && (
        <p className="px-4 py-4 font-extralight text-zinc-400">
          {"No se encontraron datos"}
        </p>
      )}
    </ul>
  );
};

export default list;
