import React from 'react'
import Spline from '@splinetool/react-spline';
import Navbarr from '../components/Navbarr';
import { useNavigate } from 'react-router-dom';
import { ChatBubbleBottomCenterTextIcon,VideoCameraIcon, MicrophoneIcon, } from '@heroicons/react/24/outline'
import Footer from '../components/Footer';
import vc from '../pic/vc.png'
import './HomePage.css'
const features = [
  {
    name: 'Real Time Chat',
    description:
    "instant communication, allowing users to engage in seamless conversations without any delays. Experience uninterrupted, lively interactions with friends, family, and colleagues anytime, anywhere.",
      icon: ChatBubbleBottomCenterTextIcon,
  },
  {
    name: 'High Quality Video Call',
    description:
      'enabling users to connect face-to-face instantly, regardless of distance. Enjoy smooth, high-quality video conversations for a truly immersive experience.',
    icon: VideoCameraIcon,
  },
  {
    name: 'Real Time Voice Chat',
    description:
      'provides crisp, clear audio, ensuring seamless and immediate communication. Stay connected with loved ones and colleagues with reliable, high-quality voice calls anywhere, anytime.',
    icon: MicrophoneIcon,
  },
  // {
  //   name: 'Screen Sharing',
  //   description:
  //     'effortlessly share screens in real-time, making collaboration and presentations smooth and efficient. Enhance your meetings with seamless visual communication and instant access to shared content.',
  //   icon: {<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cast" viewBox="0 0 16 16"><path d="m7.646 9.354-3.792 3.792a.5.5 0 0 0 .353.854h7.586a.5.5 0 0 0 .354-.854L8.354 9.354a.5.5 0 0 0-.708 0"/><path d="M11.414 11H14.5a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5h-13a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h3.086l-1 1H1.5A1.5 1.5 0 0 1 0 10.5v-7A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v7a1.5 1.5 0 0 1-1.5 1.5h-2.086z"/></svg>}
  // },
]

const HomePage = () => {
  const navigate = useNavigate();
  const handelJoinRoom = () => {
    const path ='/joinroom'
    navigate(path)
  }
   const handelCreateRoom =()=>{
    const path ='/createroom'
    navigate(path)
   }
  return (
    <>
      <Navbarr/>
      <div id="Product" className='h-14 bg-gradient-to-r from-sky-500 to-indigo-500 h-screen flex justify-around items-center '>
        <div className="relative isolate overflow-hidden bg-inherit py-16 sm:py-24 lg:py-32  ">
          <div className="mx-auto max-w-3xl px-6 lg:px-8  ">
            <div className="mx-auto flex  max-w-2xl  lg:max-w-none   ">
              <div className="max-w-xl lg:max-w-lg ">
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">Connect with your loved ones with Room</h1>
                <p className="mt-4 text-lg leading-8 text-gray-300">
                Room offers seamless video calling, screen sharing, voice chat, and real-time messaging, providing a comprehensive communication solution for remote collaboration and virtual meetings.
                </p>
                <div className="mt-6 flex max-w-md gap-x-4">
                  {/* <label htmlFor="email-address" className="sr-only">
                  Email address
                  </label>
                  <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  placeholder="Enter your email"
                  /> */}
                  <button
                  type="submit"
                  className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  onClick={handelCreateRoom}
                  >
                  Create Room
                  </button>
                  <button
                  type="submit"
                  className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  onClick={handelJoinRoom}
                  >
                  Join Room
                  </button>
                </div>
              </div>
            </div>
          </div>    
        </div>
        <div className=' home-img max-w-xs'  >
          <img src={vc}></img>
        </div>

        
      </div>

      <div id='Features' className="bg-gradient-to-r from-indigo-500 ... py-24 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Room</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Amazing features that Room provides
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
            <div key="Screen sharing" className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    {/* <feature.icon aria-hidden="true" className="h-6 w-6 text-white" /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cast text-white " viewBox="0 0 16 16">
                      <path d="m7.646 9.354-3.792 3.792a.5.5 0 0 0 .353.854h7.586a.5.5 0 0 0 .354-.854L8.354 9.354a.5.5 0 0 0-.708 0"/>
                      <path d="M11.414 11H14.5a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5h-13a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h3.086l-1 1H1.5A1.5 1.5 0 0 1 0 10.5v-7A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v7a1.5 1.5 0 0 1-1.5 1.5h-2.086z"/>
                    </svg>
                  </div>
                  Screen sharing
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">effortlessly share screens in real-time, making collaboration and presentations smooth and efficient. Enhance your meetings with seamless visual communication and instant access to shared content.</dd>
              </div>

          </dl>
        </div>
      </div>
    </div>
    <Footer/>

      
        
    </>
  )
}

export default HomePage