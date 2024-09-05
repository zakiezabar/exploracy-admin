"use client";

import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useSession } from "next-auth/react";

const SettingsPage = () => {
  const user = useCurrentUser();

  const onClick = () => {
    logout();
  }

  return ( 
    <div className="bg-white p-10 rounded-xl">
        <Button variant="secondary" onClick={onClick}>Sign Out</Button>
    </div>
   );
}
 
export default SettingsPage;