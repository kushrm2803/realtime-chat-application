import "./list.css"
import Userinfo from "./userinfo/Userinfo"
import Chatlist from "./chatlist/Chatlist"
const List=()=>{
    return(
        <div className='list'>
            <Userinfo/>
            <Chatlist/>
        </div>
    )
}

export default List