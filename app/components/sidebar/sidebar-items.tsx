"use client";

import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  label: string;
  href: string;
  iconSrc: React.ComponentType<{ size?: number | string }>;
  iconSize?: number | string;
};

export const SidebarItem = ({
  label,
  href,
  iconSrc: Icon,
  iconSize = 44,
}: Props) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Button
      variant={active ? "sidebarOutline" : "sidebar"}
      className="justify-start h-[52px] normal-case w-full"
      asChild
    >
      <Link href={href}>
        <div className="flex flex-row gap-2 items-center">
          <Icon size={iconSize}/>
          {label}
        </div>
      </Link>
    </Button>
  )
};