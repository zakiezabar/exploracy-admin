import { Nunito } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Nunito({
  subsets: ["latin"],
  weight: ["600",]
});

interface HeaderProps {
  label: string;
}

export const Header = ({
  label,
}: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <p className={cn(
        "text-muted-foreground font-semibold text-lg",
        font.className,
      )}>
        {label}
      </p>
    </div>
  );
};