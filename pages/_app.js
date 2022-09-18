import "../styles/globals.css";
import Sidebar from "../components/Sidebar";
import Loadng from "../components/Loading";
import Login from "../components/Login";
import { auth, db } from "../Firebase/init";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      setDoc(doc(db, "users", user.uid), {
        userData: user.providerData[0],
        uid: user.providerData[0].uid,
        lastSeen: serverTimestamp(),
      }, {merge: true});
    }
  }, [user]);

  if (loading) return <Loadng />;
  if (!user) return <Login />;

  return (
    <div className="flex">
      <Sidebar />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
