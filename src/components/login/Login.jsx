import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, data_base } from "../../lib/firebase";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import upload from "../../lib/upload";

const Login = () => {
  const [avatar, setavatar] = useState({
    file: null,
    url: "",
  });

  const [loading, setloading] = useState(false);

  const handleavatar = (e) => {
    if (e.target.files[0]) {
      setavatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleregister = async (e) => {
    e.preventDefault();
    setloading(true);
    const formdata = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formdata);

    if (!username || !email || !password)
      return toast.warn("Please Enter Details!");
    if (!avatar.file) return toast.warn("Please upload Profile Pic!");

    const userRef = collection(data_base, "users");
    const Query = query(userRef, where("username", "==", username));
    const querySnapShot = await getDocs(Query);
    if (!querySnapShot.empty) {
      return toast.warn("Select another username");
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const imgUrl = await upload(avatar.file);

      await setDoc(doc(data_base, "users", res.user.uid), {
        username,
        email,
        id: res.user.uid,
        avatar: imgUrl,
        blocked: [],
      });

      await setDoc(doc(data_base, "userchats", res.user.uid), {
        chats: [],
      });

      toast.success("Registered successfully!");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setloading(false);
    }
  };

  const handlelogin = async (e) => {
    e.preventDefault();
    setloading(true);
    const formdata = new FormData(e.target);
    const { email, password } = Object.fromEntries(formdata);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="login">
      <div className="item">
        <h1>Welcome back,</h1>
        <form onSubmit={handlelogin}>
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button disabled={loading}>{loading ? "LOADING" : "LOG IN"}</button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="item">
        <h1>
          <p>New,</p>
          <p>Create an Account</p>
        </h1>
        <form onSubmit={handleregister}>
          <label htmlFor="file">
            <img src={avatar.url || "./avatar.png"} alt="" />
            Upload an image
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleavatar}
          />
          <input type="text" placeholder="Username" name="username" />
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button disabled={loading}>{loading ? "LOADING" : "SIGN UP"}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
