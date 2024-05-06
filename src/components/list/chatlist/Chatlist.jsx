import { useState } from "react"
import "./chatlist.css"

const Chatlist=()=>{
    const[addMode,setAddMode]=useState(false)
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
                    onClick={()=>setAddMode((prevState)=>!prevState)}
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
        </div>
    )
}

export default Chatlist