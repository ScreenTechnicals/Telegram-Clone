import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { useRouter } from "next/router";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../Firebase/init";
import { useAuthState } from "react-firebase-hooks/auth";

const Input = ({ id }) => {
  const router = useRouter();
  
  const [inputValue, setInputValue] = useState("");
  const [currentUser] = useAuthState(auth);

  const addChat = async (e) => {
    e.preventDefault();
    setInputValue("");
    const docRef = await addDoc(collection(db, "messages"), {
      user: currentUser.email,
      message: inputValue,
      chatId: id,
      createdAt: serverTimestamp(),
    });
  };


  return (
    <div className="p-5">
      <form className="flex items-center space-x-5" onSubmit={addChat}>
        <input
          type="text"
          className="w-full bg-[#363434] pl-8 pr-16 py-3 rounded-full border border-[#585656] outline-none focus:border-[#fff]"
          placeholder="Type Here"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          autoComplete="off"
        />
        <button
          className="text-3xl p-3 absolute right-5 cursor-pointer"
        >
          <IoMdSend />
        </button>
      </form>
    </div>
  );
};

export default Input;
