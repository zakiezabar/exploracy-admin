"use client";

import { LuUser2 } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { LuSettings } from "react-icons/lu";
import { 
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";
import { SidebarItem } from "@/app/components/sidebar/sidebar-items";

export const UserButton = () => {
  const user = useCurrentUser();

  return (
      <DropdownMenu>
        <DropdownMenuTrigger className="b-0 mb-8 w-full p-2 bg-white text-slate-500 font-bold hover:bg-slate-200 focus:outline-0 transition-color rounded-xl text-md flex flex-row gap-4 items-center">
          <Avatar>
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback className="bg-slate-600">
              <LuUser2 className="text-white w-6 h-6"/>
            </AvatarFallback>
          </Avatar>
          Account
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[222px] rounded-xl" align="end">
          <SidebarItem
            label="Settings"
            href="/settings"
            iconSrc={LuSettings}
            iconSize={24}
          />
          <LogoutButton>
            <DropdownMenuItem className="font-semibold" >
              <LuLogOut className="w-6 h-6 mr-2"/>
              Logout
            </DropdownMenuItem>
          </LogoutButton>
        </DropdownMenuContent>
      </DropdownMenu>
  );
}