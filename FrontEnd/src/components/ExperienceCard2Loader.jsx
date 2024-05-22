import React from 'react'

function ExperienceCard2Loader() {
  return (
    <div className="flex flex-col shadow-md hover:shadow-2xl w-full h-full bg-white  rounded-lg  items-center mx-9 ">
            <div className='p-5 items-center flex w-96 h-80 flex-col'>
                <div className='h-96 w-full rounded-xl  loadingShimmer overflow-hidden '>
                   
                </div>
                <div className="loadingShimmer my-2  h-20 w-full flex flex-row justify-between gap-4 p-3">
                    
                </div>
                <div className='loadingShimmer my-2 w-full h-1/6  rounded-xl text-center text-2xl font-bold text-black p-3' >
                   
                </div>

            </div>
           
        </div>
  )
}

export default ExperienceCard2Loader
