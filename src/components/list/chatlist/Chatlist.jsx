import { useState } from "react"
import "./chatlist.css"
import Adduser from "./adduser/Adduser"
import { useuserStore } from "../../../lib/userStore"

const Chatlist=()=>{
    const[addMode,setAddMode]=useState(false)

    const {currentuser}=useuserStore;

    return(
        <div className='chatlist'>
            <div className="search">
                <div className="searchbar">
                    <img src="./search.png" alt="" />
                    <input type="text" placeholder="search" />
                </div>
                <img 
                    src={addMode ? "./minus.png" : "./plus.png"}
                    alt="" 
                    className="plus-icon"
                    onClick={()=>{
                        if(addMode){
                            setAddMode(false);
                        }
                        else{
                            setAddMode(true);
                        }
                    }}
                />
            </div>
            <div className="item">
               <img src="./avatar.png" alt="" />
               <div className="texts">
                <span>Jane Doe</span>
                <p>Hello</p>
               </div>
            </div>
            <div className="item">
               <img src="./avatar.png" alt="" />
               <div className="texts">
                <span>Jane Doe</span>
                <p>Hello</p>
               </div>
            </div>
            <div className="item">
               <img src="./avatar.png" alt="" />
               <div className="texts">
                <span>Jane Doe</span>
                <p>Hello</p>
               </div>
            </div>
            <div className="item">
               <img src="./avatar.png" alt="" />
               <div className="texts">
                <span>Jane Doe</span>
                <p>Hello</p>
               </div>
            </div>
            <div className="item">
               <img src="./avatar.png" alt="" />
               <div className="texts">
                <span>Jane Doe</span>
                <p>Hello</p>
               </div>
            </div>
            <div className="item">
               <img src="./avatar.png" alt="" />
               <div className="texts">
                <span>Jane Doe</span>
                <p>Hello</p>
               </div>
            </div>
            {addMode && <Adduser/>}
        </div>
    )
}

export default Chatlist