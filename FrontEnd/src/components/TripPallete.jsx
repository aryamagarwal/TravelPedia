import React from 'react'

function TripPallete() {
    return (
        <div>
            <div className="flex flex-col shadow-md hover:shadow-2xl hover:w-64 rounded-md w-60 p-3  m-9">
                <div className="image h-3/4" >
                    <img className="w-auto" src="" alt="img" />
                </div>
                <div className="details flex flex-col p-3">
                    <div className='text-left'>
                        with  trip leader
                    </div>
                    <div className="location font-bold text-2xl my-2 text-center">
                        <h1> location title</h1>
                    </div>
                    <div className="amount text-left">
                        <p>departure date . days</p>
                    </div>
                </div>
                <div className='text-left'>
                    <h1 className='text-left text-2xl'>price</h1>
                </div>
            </div>
        </div>
    )
}

export default TripPallete
