import { useState } from "react";

// React Icons
import { IoClose } from "react-icons/io5";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { TbArrowsDiagonal2 } from "react-icons/tb";
import { TbArrowsDiagonalMinimize } from "react-icons/tb";
import { IoMdSend } from "react-icons/io";
import { BiSolidMessageEdit } from "react-icons/bi";


const Chat = ({chatBox, setChatBox}) => {

    const [chatBoxExtended, setChatBoxExtended] = useState(true);
    const [chatBoxMaximized, setChatBoxMaximized] = useState(false);
    
    return (
        <>
        {chatBox && <div className={`fixed sm:z-[30] ${chatBoxMaximized ? "w-[40rem] md:w-[30rem] sm:w-[100%]" : "w-[20rem] sm:w-[100%]"} right-[15%] md:right-[5%] sm:right-0 bottom-0 border-[5px] border-orange-300 rounded-tr-2xl rounded-tl-2xl`}>
           <div className="flex justify-between bg-orange-300">
            <p className="text-lg sm:text-3xl pl-1 py-1">Seller</p>
            <div className="flex justify-between items-center">
                <span className="text-lg sm:text-3xl pr-2 cursor-pointer">{chatBoxMaximized ? <TbArrowsDiagonalMinimize onClick={()=>setChatBoxMaximized(e=>!e)} /> : <TbArrowsDiagonal2 onClick={()=>setChatBoxMaximized(e=>!e)} />}</span>
                <span className="text-lg sm:text-3xl pr-2 cursor-pointer">{chatBoxExtended ? <FaMinus onClick={()=>setChatBoxExtended(e=>!e)} /> : <FaPlus onClick={()=>setChatBoxExtended(e=>!e)} />}</span>
                <span onClick={()=>{
                    setChatBox(e=>!e) 
                    setChatBoxExtended(true)
                    setChatBoxMaximized(false)
                    }} className="text-xl sm:text-3xl pr-1 cursor-pointer"><IoClose /></span>
            </div>
           </div>
           {chatBoxExtended && <>
            <div className={`${chatBoxMaximized ? "h-[30rem]" : "h-[17rem]"} bg-white`}>
            <p className="p-1 sm:text-lg">Messages container</p>
            </div>
            
            <div className="flex justify-between items-center border-t-2 absolute right-0 bottom-0 left-0 border-orange-300">
            <BiSolidMessageEdit className="text-2xl sm:text-4xl ml-1 mt-1" />
                <input className="w-full px-1 outline-none sm:text-2xl" type="text" placeholder="Type a message" />
                <IoMdSend className="text-2xl sm:text-4xl mr-1" />
           
            </div>
           </>}
        </div>}
        </>
    )
}

export default Chat;