

// React Icons
import { IoClose } from "react-icons/io5";
import { FaMinus } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";
import { BiSolidMessageEdit } from "react-icons/bi";

const Chat = ({chatBox, setChatBox}) => {
    
    return (
        <>
        {chatBox && <div className="fixed w-[20rem] h-[20rem] right-[15%] bottom-0 border-[5px] border-orange-300 rounded-tr-2xl rounded-tl-2xl">
           <div className="flex justify-between bg-orange-300">
            <p className="text-lg pl-1 py-1">Seller</p>
            <div className="flex justify-between items-center">
                <span className="text-lg pr-2 cursor-pointer"><FaMinus /></span>
                <span onClick={()=>setChatBox(e=>!e)} className="text-xl pr-1 cursor-pointer"><IoClose /></span>
            </div>
           </div>
            <p>Let's chat</p>
            
            <div className="flex justify-between items-center border-t-2 absolute right-0 bottom-0 left-0 border-orange-300">
            <BiSolidMessageEdit className="text-2xl ml-1" />
                <input className="w-full px-1" type="text" placeholder="Type a message" />
                <IoMdSend className="text-2xl mr-1" />
           
            </div>
        </div>}
        </>
    )
}

export default Chat;