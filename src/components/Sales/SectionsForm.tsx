import clsx from "clsx";
import { FC } from "react";

interface SectionsSalesProps {
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

const SectionsForm: FC<SectionsSalesProps> = ({
  title,
  children,
  className,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full mt-8">
      <h2 className="text-2xl font-medium text-slate-800">{title}</h2>
      <hr className="bg-black" />
      <section className={clsx("flex gap-4 mt-2", className)}>
        {children}
      </section>
    </div>
  );
};

export default SectionsForm;
