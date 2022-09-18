import React from "react";
import Image from "next/future/image";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase/init";

const DropDown = () => {
  const [user, loading] = useAuthState(auth);
  const Logout = async () => {
    await signOut(auth);
  };
  return (
    <div>
      <div className="w-[100px] h-[100px] rounded-full overflow-hidden mx-auto mb-5">
        <Image src={user?.photoURL} alt="profile" width={100} height={100} />
      </div>
      <div className="w-full text-sm font-light py-2 capitalize">
        {user?.providerData[0].displayName}
      </div>
      <div
        className="w-full text-sm font-light py-2 bg-[#3a3a3a42] hover:bg-[#0000003d] border-2 border-[#cacaca] rounded-md capitalize"
        onClick={Logout}
      >
        Logout From your account
      </div>
    </div>
  );
};

export default DropDown;
