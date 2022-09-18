import React, { useState } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../Firebase/init";
import DropDown from "./DropDown";
import ChatCard from "./ChatCard";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Loading from "./Loading"

const SidebarHeader = () => {
  const [currentUser] = useAuthState(auth);

    const  [search, setSearch] = useState("");
    const usersRef = collection(db, "users");
    const [users, loading] = useCollectionData(usersRef);
    if (loading) return <Loading />;
  return (
    <div>
      <div className="flex justify-center space-x-5 items-center">
      <div>
        <button className="text-3xl relative drop-btn">
          <div>
            <IoMdMenu />
          </div>
          <div className="drop-down w-[300px] rounded-b-xl rounded-tr-xl border border-[#333333] bg-[#0000006b] backdrop-blur-sm absolute -z-[1] opacity-0 top-12 left-0 p-5 transition-all">
            <DropDown />
          </div>
        </button>
      </div>
      <div className="flex items-center relative w-full">
        <AiOutlineSearch
          className={
            search !== ""
              ? "absolute text-2xl left-5 text-[#b96aff]"
              : "absolute text-2xl left-5"
          }
        />
        <input
          type="text"
          name="search"
          id="search"
          className="w-full bg-transparent border-2 border-[#393939] px-14 py-2 rounded-full outline-none focus:border-[#b96aff]"
          placeholder="Search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
        />
        <button
          type="reset"
          className="absolute right-[2px] text-2xl hover:bg-[#252525] rounded-full p-2 transition-all"
        >
          {search !== "" ? (
            <IoMdClose
              onClick={() => {
                setSearch("");
              }}
            />
          ) : null}
        </button>
      </div>
    </div>
    <div>
      <div className={
        search !== "" ? 'w-full bg-[#212121] h-screen overflow-y-auto overflow-x-hidden transition-all mt-5' : 'w-full bg-[#212121] h-0 overflow-y-auto overflow-x-hidden transition-all mt-5'
      }>
         {
          users?.length > 0 ? users?.map((user) => {
            if (user.userData.displayName.toLowerCase().includes(search.toLowerCase()) && user.userData.displayName !== currentUser.providerData[0].displayName) {
              return(
                <ChatCard key={user.userData.uid} user={user} search={search} setSearch={setSearch} />
              )
            }
          }) : <h1>Searching...</h1>
         }
      </div>
    </div>
    </div>
  );
};

export default SidebarHeader;
