const AuthLayout = ({ children }: any) => {
  return ( 
    <div className="mx-auto flex-1 w-full h-screen flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
      <div className="flex flex-col items-center gap-y-12">
        {children}
      </div>
    </div>
   );
}
 
export default AuthLayout;