import { useEffect, useState } from "react";
import "./chatlist.css";
import Adduser from "./adduser/Adduser";
import { useuserStore } from "../../../lib/userStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { data_base } from "../../../lib/firebase";
import { usechatStore } from "../../../lib/chatStore";

const Chatlist = () => {
  const [addMode, setAddMode] = useState(false);
  const [chats, setchats] = useState([]);

  const { currentuser } = useuserStore();
  const { changechat } = usechatStore();

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

  const handleselect = async (chat) => {
    const userchats=chats.map(item=>{
      const {user,...rest}=item;
      return rest;
    })
    const chatIndex=userchats.findIndex(item=>item.chatId===chat.chatId);

    userchats[chatIndex].isSeen=true;

    const userchatsRef=doc(data_base,"userchats",currentuser.id);

    try {
      await updateDoc(userchatsRef,{
        chats:userchats,
      })
      changechat(chat.chatId, chat.user);
    } catch (err) {
      console.log(err);
    }

  };

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
        <div
          className="item"
          key={chat.chatId}
          onClick={() => handleselect(chat)}
          style={{ backgroundColor: chat?.isSeen ? "transparent" : "#5183fe" }}
        >
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
