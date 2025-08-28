import UserReg from "./UserComponents/UserReg";
import UserLog from "./UserComponents/UserLog";
import NavbarBtn from "./NavComponents/NavbarBtn";

const User = () => {
  return (
    <div className="flex flex-col justify-evenly items-center min-h-screen bg-gradient-to-r from-indigo-800 to-cyan-700 px-10 pb-5">

      {/*Navbar component*/}
      <div className="w-full relative mb-8 py-4">
        {/*Heading*/}
      <h1 className="text-5xl font-extrabold text-center font-serif bg-gradient-to-r from-lime-200 via-orange-300 to-pink-300 text-transparent bg-clip-text drop-shadow-md">Todo - Note your daily works</h1>
      <div className="absolute top-4 right-4">
        <NavbarBtn/>
      </div>
      </div>
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
