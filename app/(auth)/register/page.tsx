import WelcomeMessage from "@/components/welcomeMessage";
import Image from "next/image";
import { RegisterForm } from "@/components/auth/register-form";

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
        <RegisterForm />
      </div>
    </>
  );
}
