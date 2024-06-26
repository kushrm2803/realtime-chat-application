import { usechatStore } from "../../lib/chatStore";
import { auth, data_base } from "../../lib/firebase";
import { useuserStore } from "../../lib/userStore";
import "./detail.css";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

const Detail = () => {
  const {
    chatId,
    user,
    iscurrentuserBlocked,
    isreceiverBlocked,
    changeBlock,
    resetChat,
  } = usechatStore();
  const { currentuser } = useuserStore();

  const handleblock = async () => {
    if (!user) return;

    const userdocRef = doc(data_base, "users", currentuser.id);
    try {
      await updateDoc(userdocRef, {
        blocked: isreceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (error) {
      console.log(error);
    }
  };

  const handlelogout = () => {
    auth.signOut();
    resetChat();
  };

  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>User Details</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          <div className="photos">
            <div className="photoitem">
              <div className="photodetail">
                <img
                  src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                  alt=""
                />
                <span>Photo_2024.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoitem">
              <div className="photodetail">
                <img
                  src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                  alt=""
                />
                <span>Photo_2024.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button onClick={handleblock}>
          {iscurrentuserBlocked
            ? "You are Blocked!"
            : isreceiverBlocked
            ? "User Blocked"
            : "Block User"}
        </button>
        <button className="logout" onClick={handlelogout}>
          LOG OUT
        </button>
      </div>
    </div>
  );
};

export default Detail;
