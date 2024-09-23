import { MobileHeader } from "./_components/mobile-header";
import { SideBar } from "./_components/sidebar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <>
    {/* <div className="w-full h-screen flex flex-col gap-y-10 items-center justify-center bg-tertiary-200"> */}
      <MobileHeader />
      <SideBar className="hidden lg:flex"  />
      <main className="lg:pl-[256px] h-screen pt-[50px] lg:pt-0 bg-white text-black">
        <div className="max-w-[1056px] mx-auto pt-6 h-full">
          {children}
        </div>
      </main>
    {/* </div> */}
    </>
  );
}

export default ProtectedLayout;