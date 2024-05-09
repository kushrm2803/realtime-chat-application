import {collection, getDocs, query, where } from "firebase/firestore";
import "./adduser.css";
import { data_base } from "../../../../lib/firebase";
import { useState } from "react";

const Adduser = () => {

  const [user,setuser]=useState(null);

  const handleSearch=async(e)=>{
    e.preventDefault();

    const formdata= new FormData(e.target);
    const username= formdata.get("username");

    try {
      const userRef=collection(data_base,"users");
      const Query=query(userRef,where("username","==",username));
      const QuerySnapShot =await getDocs(Query);

      if(!QuerySnapShot.empty){
        setuser(QuerySnapShot.docs[0].data());
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="adduser">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Username" name="username" />
        <button>Search</button>
      </form>
      {user && <div className="user">
        <div className="detail">
          <img src={user.avatar || "./avatar.png"} alt="" />
          <span>{user.username}</span>
        </div>
        <button>Add User</button>
      </div>}
    </div>
  );
};

export default Adduser;
