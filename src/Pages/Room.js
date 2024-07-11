import React ,{useContext,useState} from 'react'
import { useParams } from 'react-router-dom'
import Textarea from '../components/Textarea'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import Taskbar from '../components/Taskbar'
import Video from '../components/Video'
import './Room.css'
import CopyButton from '../components/CopyButton'
// import { MyTaskbarContext } from '../TaskbarContext'
import { TaskbarContext } from '../TaskbarContext'
import { Socket } from '../SocketContext'
const Room = () => {
  const{isChatActive}= useContext(TaskbarContext)
  const {roomId} =useParams()
  const [copied, setCopied] = useState()
  
 
  return (
   
    
    <Socket>
    <div className='room bg-zinc-800 ' >
        <div className='roomid'>
        <CopyButton value={roomId}/>

        </div>
        
        <div className='flex-div flex'>
          <Video/>
          <Textarea/>
        </div>
        <Taskbar/>
        
    </div>
    </Socket>
  
      
    
      
     
    
  )
}

export default Room