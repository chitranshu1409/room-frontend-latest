import React ,{useContext} from 'react'
import './Video.css'
import ReactPlayer from 'react-player'
import { TaskbarContext } from '../TaskbarContext'
import { SocketContext } from '../SocketContext'
const Video = () => {
  const {isChatActive,ScreenShot} =useContext(TaskbarContext)
  const {clients,socketId,userMap,isMicActive,localStream,remoteStream,isScreenShareActiveRemote,remoteScreenShareStream,screenShareStream,isScreenShareActive} = useContext(SocketContext)
  
  return (
    < div className={isChatActive ? 'video-div  ' : 'video-div-chat-disable  '} >
      
      <div className={isChatActive? 'video-flex-div ':'video-full-flex-div ' }>
      
          {isScreenShareActive && <div className='screenShare-div'><ReactPlayer width="100%" height="90%" className="screen-video" url={screenShareStream} playing muted={!isMicActive} /></div>}
        
        
          {isScreenShareActiveRemote && <div className='screenShare-div'><ReactPlayer width="100%" height="90%" className="screen-video" url={remoteScreenShareStream} playing muted={!isMicActive} /></div>}
        
        <div className={isScreenShareActive|| isScreenShareActiveRemote ? 'video-when-screenshare-on':'video-when-screenshare-off'}>
          {clients.map((e,i)=>userMap[socketId].peerId==e.peerId?<ReactPlayer key={i } width={isScreenShareActive||isScreenShareActiveRemote?"100%":"85%"} height={isScreenShareActive||isScreenShareActiveRemote?"40%":"90%"} className="my-video" url={localStream} playing muted={!isMicActive} />:<ReactPlayer width={isScreenShareActive||isScreenShareActiveRemote?"100%":"85%"} height={isScreenShareActive||isScreenShareActiveRemote?"40%":"90%"} className="other-video" key={i} url={remoteStream} playing muted={!isMicActive}/>)}
        </div>
      </div>
    
    </div>
  )
}

export default Video