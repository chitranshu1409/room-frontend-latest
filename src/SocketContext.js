import React, { createContext, useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useParams, useNavigate } from 'react-router-dom';
import MediaConnection,{ Peer } from "peerjs";

export const SocketContext = createContext();

export const Socket = ({ children }) => {
  const { username, roomId ,email} = useParams();
  const navigate = useNavigate();
  
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socketId, setSocketId] = useState();
  const [userMap, setUserMap] = useState({});
  const [peers, setPeers] = useState({});
  const [clients, setClients] = useState([]);
  const [isVideoActive, setIsVideoActive] = useState(true);
  const [isMicActive, setIsMicActive] = useState(false);
  const [localStream, setLocalStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [screenShareStream, setScreenShareStream] = useState()
  const [remoteScreenShareStream, setRemoteScreenShareStream] = useState()
  const [isScreenShareActive, setIsScreenShareActive] = useState(false)
  const [otherUserPeerId, setOtherUserPeerId] = useState()
  const [isScreenShareActiveRemote, setIsScreenShareActiveRemote] = useState(false)
  const [videoTrack, setVideoTrack] = useState([])
  const [audioTrack, setAudioTrack] = useState([])
  const [streamTrack, setStreamTrack] = useState([])
  const [remoteVideoTracks, setRemoteVideoTracks] = useState([])
  const [isRemoteVideoActive, setIsRemoteVideoActive] = useState(true)


  const peerInstance = useRef(null);
  const socket = useRef("https://room-backend-latest.onrender.com/");

  useEffect(() => {
    console.log("1");
    console.log("room joined");
    const peer = new Peer({ config: { iceServers: [{ url: 'stun:stun.services.mozilla.com' }] } });
    peer.on("open", (id) => {
      socket.current.emit("joinRoom", { socketId: socket.current.id, username, roomId, peerId: id ,email:email});
      setSocketId(socket.current.id);
      
    });
    peerInstance.current = peer;

    return () => {
      peer.destroy();
    };
  }, [socket]);

  useEffect(() => {
    
    navigator.mediaDevices.getUserMedia({ video:  true , audio: true })
      
    .then((localStream) => {
      
      setVideoTrack(localStream.getVideoTracks());
      setAudioTrack(localStream.getAudioTracks());
      setLocalStream(localStream);
      
      })
    .catch((err) => {
        console.log('Failed to get local stream', err);
    });
  }, []);

  
  

  const callNewUser = (peerId) => {
    navigator.mediaDevices.getUserMedia({ video:  true , audio: true })
    .then((localStream ) => {
        const call = peerInstance.current.call(peerId, localStream);
        
        call.on('stream', (stream) => {
          setRemoteVideoTracks(stream.getVideoTracks());
         
          setRemoteStream(stream);
        });
      })
    .catch((err) => {
        console.log('Failed to get local stream', err);
      });
  };

  useEffect(() => {
    socket.current.on("user-joined", ({ otherUserPeerId, socketId, username, roomId }) => {
      console.log("new user joined",otherUserPeerId);
      setOtherUserPeerId(otherUserPeerId)
      


      
        
      callNewUser(otherUserPeerId);
        
      
    });
  }, [socket]);

  
  useEffect(()=>{
    remoteVideoTracks.forEach(track=>track.enabled=isRemoteVideoActive);
    setRemoteVideoTracks(remoteVideoTracks);
    
  },[isRemoteVideoActive])


  useEffect(()=>{
    socket.current.on("remote-video-off",({isRemoteVideoActive})=>{
      setIsRemoteVideoActive(isRemoteVideoActive);
      
    })
  },[])


  useEffect(() => {
    peerInstance.current.on("call", (call) => {
     
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          call.answer(stream);

          call.on('stream', (stream) => {
      
              setRemoteVideoTracks(stream.getVideoTracks());
              
              setRemoteStream(stream); 
            
          });
        })
        .catch((err) => {
            console.log('Failed to get local stream', err);
        });

    })
  },[peerInstance])
  
  useEffect(()=>{
    socket.current.on("screen-share-accepting",({isScreenShareActive})=>{
      setIsScreenShareActiveRemote(isScreenShareActive);
     
      peerInstance.current.on('call',(call)=>{
      
        if(isScreenShareActive){
          call.on('stream',(stream)=>{
            setRemoteScreenShareStream(stream);
          })
        }
        

      }) 
    })      
  },[peerInstance,socket.current])

  useEffect(() => {
    socket.current.on("message", ({ message, username, socketId }) => {
      setMessages([...messages, { message, username, socketId }]);
    });
  }, [messages]);

  useEffect(() => {
    socket.current.on("socketId", ({ socketId, userMap, peers, clients }) => {
      setUserMap(userMap);
      setClients(clients);
      setPeers(peers);
    });
    socket.current.on("usersupdated",({clients,userMap})=>{
      setClients(clients);
      setUserMap(userMap);
    })
  }, [userMap, clients]);

  useEffect(() => {
    if(isScreenShareActive){
      streamTrack[0].onended = function () {
        toggleScreenShare()
      };

    }
    
  },[streamTrack])


  const sendMessage = () => {
    socket.current.emit("newMessage", { socketId: socket.current.id, roomId, username, message });
  };

  const leaveRoom = () => {
    
    
    socket.current.disconnect();
    peerInstance.current.destroy();
    videoTrack[0].stop();
    audioTrack[0].stop();
    navigate('/');
  };

  const toggleVideoClass = () => {
    socket.current.emit("video-off",{isVideoActive:!isVideoActive,roomId,firstTime:false});
    videoTrack.forEach(track => track.enabled = !isVideoActive);

    setVideoTrack(videoTrack);
    
    
    setIsVideoActive(!isVideoActive);
  

    

  };

  const toggleMicClass = () => {
    setIsMicActive(!isMicActive);
  };

  
  
  const toggleScreenShare =()=>{
    setIsScreenShareActive(!isScreenShareActive)
    socket.current.emit("screen-share", {isScreenShareActive:!isScreenShareActive,roomId:roomId});
   
    if(!isScreenShareActive){
      navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
     .then((screenStream) => {
      
        setStreamTrack(screenStream.getVideoTracks());
        setScreenShareStream(screenStream)


        const call = peerInstance.current.call(otherUserPeerId, screenStream)
      })  
     .catch((error) => {
      console.log(error);
     })   
        


       
     
    }
  }

  return (
    <SocketContext.Provider value={{
      isMicActive,
      toggleMicClass,
      toggleVideoClass,
      clients,
      peers,
      localStream,
      remoteStream,
      userMap,
      socketId,
      message,
      messages,
      setMessage,
      setMessages,
      sendMessage,
      leaveRoom,
      isVideoActive,
      toggleScreenShare,
      isScreenShareActive,
      remoteScreenShareStream,
      screenShareStream,
      isScreenShareActiveRemote,
      
    }}>
      {children}
    </SocketContext.Provider>
  );
};

