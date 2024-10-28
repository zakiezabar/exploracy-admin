"use client";

import { SidebarItem } from "@/app/components/sidebar/sidebar-items";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import {
  LuUserSquare,
  LuTent, 
  LuCalendarCheck,
  LuCrown,
  LuMessagesSquare,
  LuAward,
  LuServer,
  LuServerCrash,
  LuFileLock,
  
} from "react-icons/lu";
// import { signOut } from "next-auth/react";
import { UserButton } from "@/components/auth/user-button";

// export const SideBar = () => {
//   return (
//     <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
//       <div className="flex gap-x-2">
//       </div>
//       <p>User Button</p>
//     </nav>
//   );
// }

type Props = {
  className?: string;
};

export const SideBar = ({ className }: Props) => {

  // const router = useRouter();

  // const onClick =  async () => {
  //   await signOut();
  // }

  return (
    <div className={cn(
      "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col bg-slate-100",
      className,
    )}>
      <Link href="/dashboard">
        <div className="pt-8 pl-4 pb-8 flex items-center gap-x-3">
          <Image src="/images/logo-full-dark.png" height={40} width={160} alt="logo-full" />
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem
          label="Users"
          href="/dashboard"
          iconSrc={LuUserSquare}
          iconSize={24}
        />
        <SidebarItem
          label="Listings"
          href="/listings"
          iconSrc={LuTent}
          iconSize={24}
        />
        <SidebarItem
          label="Reservations"
          href="/reservations"
          iconSrc={LuCalendarCheck}
          iconSize={24}
        />
        <SidebarItem
          label="Booking History"
          href="/booking-history"
          iconSrc={LuCalendarCheck}
          iconSize={24}
        />
        <SidebarItem
          label="Leaderboard"
          href="/leaderboard"
          iconSrc={LuCrown}
          iconSize={24}
        />
        <SidebarItem
          label="Comments"
          href="/comments"
          iconSrc={LuMessagesSquare}
          iconSize={24}
        />
        <SidebarItem
          label="Points"
          href="/points"
          iconSrc={LuAward}
          iconSize={24}
        />
        <SidebarItem
          label="Server"
          href="/server"
          iconSrc={LuServer}
          iconSize={24}
        />
        <SidebarItem
          label="Client"
          href="/client"
          iconSrc={LuServerCrash}
          iconSize={24}
        />
        <SidebarItem
          label="Admin"
          href="/admin"
          iconSrc={LuFileLock}
          iconSize={24}
        />
        </div>
        {/* <div className="b-0 mb-8 w-full">
          <Button variant="ghost" onClick={()=>onClick()} className="w-full">Sign Out</Button>
        </div> */}
        <UserButton />
    </div>
  )
};