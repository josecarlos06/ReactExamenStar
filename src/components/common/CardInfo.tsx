import { ReactNode } from "react";

interface Props {
   title: string;
   total: number;
   paragraph: string;
   color: string;
   children: ReactNode;
}

const CardInfo = ({ title, total, paragraph, color, children }: Props) => {
   return (
      <div
         className="mt-5 py-6 px-8 rounded-lg text-white flex items-center justify-between transition-all hover:-translate-y-1"
         style={{ backgroundColor: color }} 
      >
         <div className="flex flex-col gap-2">
            <h2 className="font-medium text-sm">{title}</h2>
            <span className="font-semibold text-3xl">{total}</span>
            <p className="text-white opacity-80 text-xs">{paragraph}</p>
         </div>
         <figure className="bg-white/40 p-3 rounded-full">{children}</figure>
      </div>
   );
};

export default CardInfo;
