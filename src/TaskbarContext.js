import React, { createContext, useState, useEffect } from 'react';
import { useScreenshot } from 'use-react-screenshot'
export const TaskbarContext = createContext();

export const MyTaskbarContext = (props)=>{
    const [isChatActive, setIsChatActive] = useState(false)
    const [image, takeScreenshot] = useScreenshot()
    
    const toggleChatClass =()=>{
        setIsChatActive(!isChatActive)
        
    }
    const ScreenShot = ()=>{
        

    }
    
      

    return(
        <TaskbarContext.Provider value={{isChatActive,setIsChatActive,toggleChatClass,ScreenShot}}>
            {props.children}
        </TaskbarContext.Provider>
    )
}