import { useEffect } from "react";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notifications/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useuserStore } from "./lib/userStore";
import { usechatStore } from "./lib/chatStore";

const App = () => {
  const { currentuser, isloading, fetchuserinfo } = useuserStore();
  const { chatId } = usechatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchuserinfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchuserinfo]);

  if (isloading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      {currentuser ? (
        <>
          <List />
          {chatId && <Chat />}
          {chatId && <Detail />}
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
};

export default App;
