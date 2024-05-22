import React from 'react'

function ExperienceCardLoader() {
  return (
    <div className="flex flex-col w-full hover:shadow-2xl shadow-md rounded-md p-5 lg:p-1 lg-m-9 items-center m-3 "
        >
            <div className="flex flex-col lg:items-center lg:flex-row rounded-md w-full ">
                <div className="loadingShimmer h-60 w-full lg:w-1/3 2xl:w-1/4 flex rounded-xl items-center justify-center overflow-hidden relative" >
                </div>
                <div className="details w-full lg:w-4/5 flex  flex-col lg:flex-row md:gap-8 p-3">
                    <div className="flex flex-col w-full mid:w-2/3 border-r-2 border-white border-solid">
                        <div className=" mx-2 loadingShimmer">
                            
                        </div>
                        <div className='loadingShimmer  my-2 sm:my-5' >
                           
                        </div>
                    </div>
                    <div className=' flex flex-col w-full  lg:w-2/5 items-center p-0 gap-3 text-md md:text-lg'>
                        <div className='loadingShimmer flex md:flex-col w-full items-center p-0 justify-between md:justify-normal gap-3 text-md md:text-lg'>
                           
                        </div>
                        <div className='loadingShimmer w-full md:block'>
                           
                        </div>
                        <div className="loadingShimmer  w-full text-center mt-2 md:mt-7">
                            
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
  )
}

export default ExperienceCardLoader
