import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils/cn";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  headerLabel: string;
}

export const Header = ({headerLabel}: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn(
        "text-2xl font-semibold",
        font.className,
      )}>
        {headerLabel}
      </h1>
    </div>
  );
};
