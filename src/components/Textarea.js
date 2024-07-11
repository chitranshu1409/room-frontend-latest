import React ,{useContext,useEffect,useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { SocketContext, useSocket} from '../SocketContext'
import './Textarea.css'
import { TaskbarContext } from '../TaskbarContext'

const Textarea = () => {
  const {username, roomId} = useParams()
  const {isChatActive,toggleChatclassName} =useContext(TaskbarContext)
  const {sendMessage,messages,message,userMap,socketId,setMessage} =useContext(SocketContext)
 

  







 
  
  
  return (
    <>
      {console.log(roomId)}
        <div className={isChatActive ? 'chat ' : 'chat-disable'}>
            
            <div className='chat-box '>
              
              {messages.map((e, i) => 
                userMap[socketId].username === e.username?
                <div className="flex justify-end gap-2.5">
                  <div className="flex flex-col gap-1 w-78 max-w-[320px]">
                    <div className="flex justify-end items-center space-x-2 ltr:space-x-reverse">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{e.username}</span>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
                        
                         
                    </div>
                    <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-s-xl rounded-ee-xl dark:bg-gray-700">
                       <p className="text-sm font-normal text-gray-900 dark:text-white"> {e.message}</p>
                    </div>
                    <span className="text-sm text-end font-normal text-gray-500 dark:text-gray-400">Delivered</span>
                  </div>
                  <img className="w-8 h-8 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqYdmXR876Rfg_gXb1L9SyGMUht1Cz-TNb5A0GV8IHHNEtjWpGGpGCVysuKfS6HUgT_QA&usqp=CAU" alt="Jese image"/>
                   
                </div> :
                
                <div className="flex items-start gap-2.5">
                   <img className="w-8 h-8 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKr20ZX27XgYPFI8bjJYc_fTYO-W1kD3cynpneHj6HizwnhRpncvArlEttI535bXYN9UQ&usqp=CAU" alt="Jese image"/>
                   <div className="flex flex-col gap-1 w-78 max-w-[320px]">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                         <span className="text-sm font-semibold text-gray-900 dark:text-white">{e.username}</span>
                         <span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
                      </div>
                      <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                         <p className="text-sm font-normal text-gray-900 dark:text-white"> {e.message}</p>
                      </div>
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
                   </div>
                </div>   
   
   
   

              )}
            </div>
            <div className='chat-send-elements'>
                <input onKeyDown={(e)=> {if (e.key === "Enter") sendMessage();}} className='chat-input' placeholder='enter message' name='message' onChange={(ev)=>setMessage(ev.target.value)}  ></input>
                <button  className='chat-send-btn' onClick={()=>sendMessage()}>➡️</button>
                
            </div>
        </div>
        
    </>
  )
}

export default Textarea