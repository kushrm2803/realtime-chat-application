import { useState } from "react"
import "./chat.css"
import EmojiPicker from "emoji-picker-react"

const Chat=()=>{
const [openEmoji,setopenEmoji]=useState(false)
const [text,settext]=useState("")

const handleEmoji=(e)=>{
    settext((prevstate)=>prevstate+e.emoji);
    setopenEmoji(false);
};  

    return(
        <div className='chat'>
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
                <div className="message">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, dicta! Accusantium laudantium, beatae mollitia facilis neque, ipsum pariatur deserunt rerum officia inventore deleniti placeat iusto excepturi enim magnam libero ex.</p>
                        <span>2 min ago</span>
                    </div>
                </div>
                <div className="message own">
                    <div className="texts">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, dicta! Accusantium laudantium, beatae mollitia facilis neque, ipsum pariatur deserunt rerum officia inventore deleniti placeat iusto excepturi enim magnam libero ex.</p>
                        <span>2 min ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, dicta! Accusantium laudantium, beatae mollitia facilis neque, ipsum pariatur deserunt rerum officia inventore deleniti placeat iusto excepturi enim magnam libero ex.</p>
                        <span>2 min ago</span>
                    </div>
                </div>
                <div className="message own">
                    <div className="texts">
                        <img src="" alt="" />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, dicta! Accusantium laudantium, beatae mollitia facilis neque, ipsum pariatur deserunt rerum officia inventore deleniti placeat iusto excepturi enim magnam libero ex.</p>
                        <span>2 min ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, dicta! Accusantium laudantium, beatae mollitia facilis neque, ipsum pariatur deserunt rerum officia inventore deleniti placeat iusto excepturi enim magnam libero ex.</p>
                        <span>2 min ago</span>
                    </div>
                </div>
            </div>
            <div className="bottom">
                <div className="icons">
                    <img src="./img.png" alt="" />
                    <img src="./camera.png" alt="" />
                    <img src="./mic.png" alt="" />
                </div>
                <input type="text" 
                    placeholder="Message"
                    value={text}
                    onChange={(e)=>settext(e.target.value)}
                />
                <div className="emoji">
                    <img src="./emoji.png" alt="" onClick={()=>{
                        if(openEmoji){
                            setopenEmoji(false);
                        }
                        else{
                            setopenEmoji(true);
                        }
                    }}/>
                    <div className="picker">
                        <EmojiPicker open={openEmoji} onEmojiClick={handleEmoji}/>
                    </div>
                </div>
                <button className="sendbutton">Send</button>
            </div>
        </div>
    )
}

export default Chat
