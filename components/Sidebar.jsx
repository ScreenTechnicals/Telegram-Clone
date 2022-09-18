import React from "react";
import SidebarHeader from "./SidebarHeader";
import { AiOutlineUserAdd } from "react-icons/ai" 
import Chat from "./Chat";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../Firebase/init";
import { collection, orderBy, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import LoadingCard from "./LoadingCard";


const Sidebar = () => {
  const [currentUser] = useAuthState(auth);
  const chatsRef = collection(db, "chats");
  const queryChats = query(chatsRef, orderBy('createdAt'));
  const [chatSnapshotsData, loading] = useCollectionData(queryChats);

  return (
    <div className="w-[600px] h-screen overflow-hidden bg-[#212121] p-3 space-y-5 relative">
      <div className="space-y-5 z-[999] bg-[#212121]">
        <SidebarHeader />
        <div className="w-full text-center space-y-2">
          <span className="w-full py-2 ">All Chats</span>
          <div className="w-full h-[2px] rounded-full bg-[#b96aff]"></div>
        </div>
      </div>
      <div className="h-[87%] overflow-y-auto">
    {/* Chats */}
    { chatSnapshotsData ?
      chatSnapshotsData?.map((chat) => {
        if (chat.users.filter((user)=> user === currentUser.email)?.length === 1) {
          return(
            <Chat key={chat.uid} currentUser={currentUser} users={chat.users} />
          )
        }
      }):
      <div className="space-y-5">
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </div>
    }
      </div>
      <div  className="absolute bottom-10 z-[99] right-10">
        <button className="text-3xl p-3 bg-[#ffffff] text-black rounded-full hover:bg-[#ffffff65] hover:text-white"><AiOutlineUserAdd /></button>
      </div>
    </div>
  );
};

export default Sidebar;
