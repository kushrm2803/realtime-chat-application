import { useEffect, useRef, useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { data_base } from "../../lib/firebase";
import { usechatStore } from "../../lib/chatStore";
import { useuserStore } from "../../lib/userStore";
import upload from "../../lib/upload";
import { format } from "timeago.js";

const Chat = () => {
  const [openEmoji, setopenEmoji] = useState(false);
  const [chat, setchat] = useState();
  const [text, settext] = useState("");
  const [img, setimg] = useState({
    file: null,
    url: "",
  });

  const { chatId, user, iscurrentuserBlocked, isreceiverBlocked } =
    usechatStore();
  const { currentuser } = useuserStore();

  const endref = useRef(null);

  useEffect(() => {
    endref.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(doc(data_base, "chats", chatId), (res) => {
      setchat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  const handleEmoji = (e) => {
    settext((prevstate) => prevstate + e.emoji);
    setopenEmoji(false);
  };

  const handleimg = (e) => {
    if (e.target.files[0]) {
      setimg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handlesend = async () => {
    if (text === "") return;

    let imgUrl = null;

    try {
      if (img.file) {
        imgUrl = await upload(img.file);
      }

      await updateDoc(doc(data_base, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentuser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        }),
      });

      const userIds = [currentuser.id, user.id];

      userIds.forEach(async (id) => {
        const userchatsRef = doc(data_base, "userchats", id);
        const userchatsSnapshot = await getDoc(userchatsRef);

        if (userchatsSnapshot.exists()) {
          const userchatsData = userchatsSnapshot.data();
          const chatIndex = userchatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userchatsData.chats[chatIndex].lastmessage = text;
          userchatsData.chats[chatIndex].isSeen =
            id === currentuser.id ? true : false;
          userchatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userchatsRef, {
            chats: userchatsData.chats,
          });
        }
      });
    } catch (err) {
      console.log(err);
    } finally {
      setimg({
        file: null,
        url: "",
      });
      settext("");
    }
  };

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={user?.avatar || "./avatar.png"} alt="" />
          <div className="texts">
            <span>{user?.username}</span>
            <p>User Info</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center">
        {chat?.messages?.map((message) => (
          <div
            className={
              message.senderId === currentuser?.id ? "message own" : "message"
            }
            key={message?.createAt}
          >
            <div className="texts">
              {message.img && <img src={message.img} alt="" />}
              <p>{message.text}</p>
              <span>{format(message.createdAt.toDate())}</span>
            </div>
          </div>
        ))}
        {img.url && (
          <div className="message own">
            <div className="texts">
              <img src={img.url} alt="" />
            </div>
          </div>
        )}
        <div ref={endref}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <img src="./img.png" alt="" />
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleimg}
          />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          type="text"
          placeholder={
            iscurrentuserBlocked || isreceiverBlocked
              ? "You cannot send a message"
              : "Type a message..."
          }
          value={text}
          onChange={(e) => settext(e.target.value)}
          disabled={iscurrentuserBlocked || isreceiverBlocked}
        />
        <div className="emoji">
          <img
            src="./emoji.png"
            alt=""
            onClick={() => {
              if (openEmoji) {
                setopenEmoji(false);
              } else {
                setopenEmoji(true);
              }
            }}
          />
          <div className="picker">
            <EmojiPicker open={openEmoji} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button
          className="sendbutton"
          onClick={handlesend}
          disabled={iscurrentuserBlocked || isreceiverBlocked}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
