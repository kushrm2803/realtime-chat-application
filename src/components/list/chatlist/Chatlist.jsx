import { useEffect, useState } from "react";
import "./chatlist.css";
import Adduser from "./adduser/Adduser";
import { useuserStore } from "../../../lib/userStore";
import { doc, getDoc, onSnapshot,updateDoc } from "firebase/firestore";
import { data_base } from "../../../lib/firebase";

const Chatlist = () => {
  const [addMode, setAddMode] = useState(false);
  const [chats, setchats] = useState([]);

  const { currentuser } = useuserStore();

  useEffect(() => {
    const unSub = onSnapshot(
      doc(data_base, "userchats", currentuser.id),
      async (res) => {
        const items = res.data().chats;

        const promise = items.map(async (item) => {
          const userdocRef = doc(data_base, "users", item.receiverId);
          const userdocSnap = await getDoc(userdocRef);

          const user = userdocSnap.data();

          return { ...item, user };
        });

        const chatdata = await Promise.all(promise);

        setchats(chatdata.sort((a, b) => b.updatedAt - addMode.updatedAt));
      }
    );

    return () => {
      unSub();
    };
  }, [currentuser.id]);

  console.log(chats);

  return (
    <div className="chatlist">
      <div className="search">
        <div className="searchbar">
          <img src="./search.png" alt="" />
          <input type="text" placeholder="search" />
        </div>
        <img
          src={addMode ? "./minus.png" : "./plus.png"}
          alt=""
          className="plus-icon"
          onClick={() => {
            if (addMode) {
              setAddMode(false);
            } else {
              setAddMode(true);
            }
          }}
        />
      </div>
      {chats.map((chat) => (
        <div className="item" key={chat.chatId}>
          <img src={chat.user.avatar || "./avatar.png"} alt="" />
          <div className="texts">
            <span>{chat.user.username}</span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}
      {addMode && <Adduser />}
    </div>
  );
};

export default Chatlist;
