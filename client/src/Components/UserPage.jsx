import UserReg from "./UserComponents/UserReg";
import UserLog from "./UserComponents/UserLog";
import UserNav from "./UserComponents/UserNav";

const User = () => {
  return (
    <div className="flex flex-col justify-evenly items-center min-h-screen bg-gradient-to-r from-blue-100 to-red-100 px-10 pb-5">

      {/*Navbar component*/}
      <div className="w-full">
      <UserNav />
      </div>

        {/*Heading*/}
      <h1 className="text-3xl font-extrabold text-center mb-8 font-serif bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-transparent bg-clip-text drop-shadow-md">Todo - Note your daily works</h1>

      <div className="flex w-full max-w-6xl gap-10">
        {/* Left Side - Registration */}
        <div className="bg-white rounded-2xl min-h-[400px] shadow-lg p-2 flex flex-[0.8] items-center justify-center">
          <UserReg />
        </div>

        {/* Right Side - Login */}
        <div className="bg-white rounded-2xl min-h-[400px] shadow-lg p-2 flex flex-[0.8] items-center justify-center self-center">
          <UserLog />
        </div>
      </div>
    </div>
  );
};

export default User;
