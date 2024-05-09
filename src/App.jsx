import { useEffect } from "react";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notifications/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useuserStore } from "./lib/userStore";

const App = () => {

  const {currentuser,isloading,fetchuserinfo}=useuserStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchuserinfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchuserinfo]);

  if(isloading) return <div className="loading">Loading...</div>

  return (
    <div className="container">
      {currentuser ? (
        <>
          <List />
          <Chat />
          <Detail />
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
};

export default App;
