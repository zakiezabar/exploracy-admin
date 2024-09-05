import WelcomeMessage from "@/components/welcomeMessage";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Input from "../../components/inputs/Input";
import { LoginForm } from "@/components/auth/login-form";

export default function Home() {
  return (
    <>
      <div className="flex flex-col ">
        <div className="flex gap-2 text-neutral-800 text-2xl font-bold justify-center items-center">
          <WelcomeMessage />welcome to
        </div>
        <Image src="/images/logo-full-primary.svg" width={300} height={200} alt="Exploracy logo"/>
      </div>
      <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
        <LoginForm />
      </div>
    </>
  );
}
