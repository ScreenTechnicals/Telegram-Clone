import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import Image from "next/future/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 } from "uuid";
import { auth, db } from "../Firebase/init";

const ChatCard = ({ user, search, setSearch }) => {
  const router = useRouter();
  // console.log(user?.userData);
  const image = user?.userData.photoURL;
  const [currentUser, loading] = useAuthState(auth);

  const createChat = async () => {
    await setDoc(
      doc(db, "chats", user?.userData.uid),
      {
        users: [currentUser.email, user.userData.email],
        uid: user?.userData.uid,
        createdAt: serverTimestamp(),
      },
      { merge: true }
    );
    setSearch("");
    router.push(`/chats/${user?.userData.uid}`);
  };
  return (
    <div
      className="w-full flex items-center p-2 space-x-5 border-b rounded-2xl border-[#282828] cursor-pointer hover:bg-[#0000003d] mb-1"
      onClick={createChat}
    >
      <div>
        <div className="w-[60px] h-[60px] border border-[#1a1a1a] rounded-full shadow-md overflow-hidden">
          {user && (
            <img
              src={image}
              alt=""
              className="pointer-events-none"
              referrerPolicy="no-referrer"
            />
          )}
        </div>
      </div>
      <div className="flex justify-between w-full items-center">
        <div>
          <h1>{user && user.userData.displayName}</h1>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
