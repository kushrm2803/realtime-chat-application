import "./adduser.css";
import { data_base } from "../../../../lib/firebase";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { useuserStore } from "../../../../lib/userStore";

const Adduser = () => {
  const [user, setuser] = useState(null);
  const { currentuser } = useuserStore();

  const handleSearch = async (e) => {
    e.preventDefault();

    const formdata = new FormData(e.target);
    const username = formdata.get("username");

    try {
      const userRef = collection(data_base, "users");
      const Query = query(userRef, where("username", "==", username));
      const QuerySnapShot = await getDocs(Query);

      if (!QuerySnapShot.empty) {
        setuser(QuerySnapShot.docs[0].data());
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleadd = async () => {
    const chatRef = collection(data_base, "chats");
    const userchatsRef = collection(data_base, "userchats");

    try {
      const newchatRef = doc(chatRef);

      await setDoc(newchatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });
      await updateDoc(doc(userchatsRef, user.id), {
        chats: arrayUnion({
          chatId: newchatRef.id,
          lastmessage: "",
          receiverId: currentuser.id,
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(doc(userchatsRef, currentuser.id), {
        chats: arrayUnion({
          chatId: newchatRef.id,
          lastmessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="adduser">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Username" name="username" />
        <button>Search</button>
      </form>
      {user && (
        <div className="user">
          <div className="detail">
            <img src={user.avatar || "./avatar.png"} alt="" />
            <span>{user.username}</span>
          </div>
          <button onClick={handleadd}>Add User</button>
        </div>
      )}
    </div>
  );
};

export default Adduser;
