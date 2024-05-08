import "./userinfo.css"
import { useuserStore } from "../../../lib/userStore";

const Userinfo=()=>{
    const {currentuser}=useuserStore();

    return(
        <div className='userinfo'>
            <div className="user">
                <img src= {currentuser.avatar || "./avatar.png"} alt="" />
                <h2>{currentuser.username}</h2>
            </div>
            <div className="icons">
                <img src="./more.png" alt="" />
                <img src="./video.png" alt="" />
                <img src="./edit.png" alt="" />
            </div>
        </div>
    )
}

export default Userinfo