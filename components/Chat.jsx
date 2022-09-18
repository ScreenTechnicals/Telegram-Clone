import {
  addDoc,
  collection,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import Image from "next/future/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, db } from "../Firebase/init";
import { getReciverEmail } from "../utils/getReciverEmail";



const Chat = ({ currentUser, users }) => {
  const router = useRouter();
  const reciverEmail = getReciverEmail(currentUser, users);
  const usersRef = collection(db, "users");

  const [reiverSnapshot, loading] = useCollectionData(usersRef);
  const image = reiverSnapshot?.filter(
    (u) => u.userData.email === reciverEmail
  )?.[0].userData.photoURL;
  const name = reiverSnapshot?.filter(
    (u) => u.userData.email === reciverEmail
  )?.[0].userData.displayName;
  const id = reiverSnapshot?.filter(
    (u) => u.userData.email === reciverEmail
  )?.[0].userData.uid;

  return (
    <Link href={`/chats/${id}`}>
      <div className="w-full flex items-center p-2 space-x-5 border-b rounded-2xl border-[#282828] cursor-pointer hover:bg-[#0000003d] mb-1">
        <div>
          <div className="w-[60px] h-[60px] border border-[#1a1a1a] rounded-full shadow-md overflow-hidden">
            {reiverSnapshot?.filter((u) => u.userData.email === reciverEmail)
              ?.length === 1 && (
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
          <div>{name}</div>
        </div>
      </div>
    </Link>
  );
};

export default Chat;
//
