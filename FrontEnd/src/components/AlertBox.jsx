import React from 'react'
import { IoMdAlert } from "react-icons/io";
function AlertBox(props) {
  return (
    <div className="fixed  top-0 left-0 w-full h-full bg-transparent z-50 text-center ">
       <div className='top-1/2 left-1/2 flex-col items-center justify-center -translate-y-1/2 pt-5 pb-0 -translate-x-1/2 w-2/5 h-2/5 relative bg-white shadow-xl rounded-xl' >
        <IoMdAlert className='text-8xl text-red-800  pb-0 relative left-1/2 -translate-x-1/2'/>
        <h1 className='mt-8 text-2xl'>{props.message}</h1>
        <div className='flex float-right relative gap-5 mt-16 px-16 bottom-0'>
            <button onClick={()=>{props.setAlertResponse(false) ; props.setShowAlert(false)}} className='p-2 w-24 rounded-3xl border-solid border-red-800 border-2 hover:text-white hover:bg-red-800'>NO</button>
            <button onClick={()=>{props.setAlertResponse(true); props.setShowAlert(false)}}className='p-2 w-24 rounded-3xl border-solid border-red-800 border-2 hover:text-white hover:bg-red-800'>YES</button>
        </div>
       </div>
    </div>
  )
}

export default AlertBox
