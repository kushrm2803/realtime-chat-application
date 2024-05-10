import { useEffect, useRef, useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { doc, onSnapshot } from "firebase/firestore";
import { data_base } from "../../lib/firebase";
import { usechatStore } from "../../lib/chatStore";

const Chat = () => {
  const [openEmoji, setopenEmoji] = useState(false);
  const [chat, setchat] = useState();
  const [text, settext] = useState("");

  const { chatId } = usechatStore();

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

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>John Doe</span>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center">
        {chat.messages.map((message) => (
          <div className="message own" key={message?.creatAt}>
            <div className="texts">
              {message.img && <img src={message.img} alt="" />}
              <p>{message.text}</p>
              {/* <span>{message}</span> */}
            </div>
          </div>
        ))}
        <div ref={endref}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          type="text"
          placeholder="Message"
          value={text}
          onChange={(e) => settext(e.target.value)}
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
        <button className="sendbutton">Send</button>
      </div>
    </div>
  );
};

export default Chat;
