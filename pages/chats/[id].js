import { collection, orderBy, query, where } from "firebase/firestore";
import React from "react";
import Input from "../../components/Input";
import { auth, db } from "../../Firebase/init";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { v4 } from "uuid";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingCard from "../../components/LoadingCard";


export async function getServerSideProps(context) {
  const id = context.query.id;

  return {
    props: {
      id,
    },
  };
}

const Id = ({ id }) => {
  const messagesRef = collection(db, "messages");
  const messageQuery = query(messagesRef, orderBy("createdAt"));
  const [messageData, loading] = useCollectionData(messageQuery);

  const [currentUser] = useAuthState(auth);

  const usersRef = collection(db, "users");
  const userQuery = query(usersRef, where("uid", "==", id));
  const [userData, loadingUser] = useCollectionData(userQuery);
    console.log();

    const newDate = new Date(userData?.[0]?.lastSeen.seconds * 1000);
    const time = newDate.toLocaleTimeString();
    const date = newDate.toLocaleDateString();

  return (
    <div className="gradient w-full h-screen overflow-hidden">
      <div className="w-full p-5 backdrop-blur-[2px] bg-[#2222220d] flex items-center space-x-5">
        <div className="w-[70px] h-[70px] overflow-hidden rounded-full">
            <img src={userData?.[0]?.userData.photoURL} alt="" referrerPolicy="no-referrer" />
        </div>
        <div>
            <h1 className="text-xl font-semibold">{userData?.[0]?.userData.displayName}</h1>
            <h1>last seen at {time.slice(0, 5)} on {date}</h1>
        </div>
      </div>
      <div className="w-full p-5 h-[80vh] overflow-x-hidden overflow-y-auto">
        {messageData?.length > 0
          ? messageData?.map((msg) => {
              return (
                <div key={v4()} className={
                    msg.user === currentUser.email ?
                    "w-full flex justify-end mb-5" :
                    "w-full flex mb-5"
                }>
                  <div className="bg-[#ffffff23] min-w-[200px] p-5 rounded-md backdrop-blur-sm">
                    <h1 className="text-sm font-light">
                     {msg.message}
                    </h1>
                    <h1 className="text-right text-gray-500">5:00 Am</h1>
                  </div>
                </div>
              );
            })
          : <div className="space-y-5">
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </div> }
      </div>
      <div className="w-full h-[11vh] bg-[#1b1b1b0e] backdrop-blur-sm">
        <Input id={id} />
      </div>
    </div>
  );
};

export default Id;
