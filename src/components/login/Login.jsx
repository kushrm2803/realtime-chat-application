import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";

const Login = () => {
  const [avatar, setavatar] = useState({
    file: null,
    url: "",
  });

  const handleavatar = (e) => {
    if (e.target.files[0]) {
      setavatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleregister = async(e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const {username,email,password}=Object.fromEntries(formdata);
    try{
      const res=await createUserWithEmailAndPassword(auth,email,password);
      toast.success("Registered successfully!");
    }catch(err){
      toast.error(err.message); 
    }
  };

  const handlelogin = (e) => {
    e.preventDefault();
    toast.success("Welcome back!");
  };

  return (
    <div className="login">
      <div className="item">
        <h1>Welcome back,</h1>
        <form onSubmit={handlelogin}>
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button>LOG IN</button>
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
            {" "}
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
          <button>SIGN IN</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
