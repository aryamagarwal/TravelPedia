import React, { useEffect } from 'react'
import TripPallete from '../components/TripPallete'
function Trips() {
    const tripStyles = ["Adventure", "Cultural", "Wildlife", "Relaxing", "Historical", "Culinary", "Educational", "Religious", "Wellness", "Female Only"]
    const [selectedStyles, setSelectedStyles] = React.useState([])
    const tripLeaderLanguages = ["Hindi", "English", "Telugu", "Tamil", "Kannada", "Malayalam", "Bengali", "Marathi", "Gujarati", "Punj"]
    const [selectedLanguages, setSelectedLanguages] = React.useState([])
    const [duration, setDuration] = React.useState(0)
    const [price, setPrice] = React.useState(0)
    const months = []
    const date = new Date()
    for (let i = 0; i < 12; i++) {
        let month = date.getMonth() + i
        let year = date.getFullYear()
        if (month > 11) {
            month = month - 12
            year = year + 1
        }
        months.push(month+"."+year);
    }
    const [selectedMonths, setSelectedMonths] = React.useState([])
    const getMonthString = (month) => {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return monthNames[month];
        
    }
    const [clearFilters, setClearFilters] = React.useState(false)
    useEffect(() => {
       if(clearFilters){
           setSelectedLanguages([])
           setSelectedMonths([])
           setSelectedStyles([])
           setDuration(0)
           setPrice(0)
           setClearFilters(false)
       }
    }, [clearFilters])
    return (
        <div>
            <div className='bg-red-800 flex flex-col justify-center gap-4 items-center text-white p-14'>
                <h1 className='text-6xl font-bold'>Browse Trips</h1>
                <h4 className='text-3xl'>Find your next big escapade</h4>
            </div>
            <div className='flex flex-row  p-8 gap-10 justify-center'>
                <div className='flex flex-col justify-center gap-4  w-1/4 '>
                {selectedStyles.length > 0 || selectedLanguages.length > 0 || duration > 0 || price > 0 || selectedMonths.length > 0 ? (
                        <button className=" w-fit border-solid border-red-800 border-2 p-3 rounded-full hover:text-red-800"onClick={() => {
                            setClearFilters(true)
                        }}>Clear Filters</button>
                    ) : null}
                    <div >
                        <h2 className='text-xl font-bold text-red-800'>Trip Style</h2>
                        <div className='grid grid-cols-3 gap-5 p-4'>
                            {tripStyles.map((style, index) => (
                                <button key={index} className={"p-5 text-center shadow-md hover:border-solid hover:border-red-800 hover:border-2 hover:text-red-80 " + (selectedStyles.length !== 0 ? selectedStyles.find((ele) => {
                                    return ele === style
                                }) ? "border-red-800 border-2 border-solid text-red-800" : "" : "")} onClick={() => {
                                    if (selectedStyles.includes(style)) {
                                        setSelectedStyles(selectedStyles.filter((ele) => {
                                            return ele !== style
                                        }))
                                    } else {
                                        setSelectedStyles([...selectedStyles, style])
                                    }
                                }}>{style}</button>
                            ))}
                        </div>
                    </div>
                    <div >
                        <h2 className='text-xl font-bold text-red-800'>Trip Leader Language</h2>
                        <div className='grid grid-cols-3  gap-5 p-4'>
                             {tripLeaderLanguages.map((language, index) => (
                                <div key={index} className='flex flex-row items-center'>
                                    <input className="accent-red-800 w-5 h-5" type="checkbox" id={language} onChange={() => {
                                        if (selectedLanguages.includes(language)) {
                                            setSelectedLanguages(selectedLanguages.filter((ele) => {
                                                return ele !== language
                                            }))
                                        } else {
                                            setSelectedLanguages([...selectedLanguages, language])
                                        }
                                    }}
                                        checked={selectedLanguages.includes(language)} />
                                    <label htmlFor={language}>{language}</label>
                                </div>
                            ))}
                        </div>

                    </div>
                    <div >
                        <h2 className='text-xl font-bold text-red-800'>Duration</h2>
                        <input className="accent-red-800 w-full "type="range" min="0" max="15" value={duration} onChange={(e) => {
                             setDuration(e.target.value)
                        }} />
                        <p className='text-right text-red-800'>{duration} days</p>
                    </div>
                    <div>
                        <h2 className='text-xl text-red-800 font-bold'>Price</h2>
                        <input className="accent-red-800 w-full" type="range" min="0" max="500000" value={price} onChange={(e) => {
                            setPrice(e.target.value)
                        }} />
                        <p className='text-right text-red-800'>₹{price}</p>
                    </div>
                    <div>
                        <h2 className='text-xl text-red-800 font-bold'>Departure Month</h2>
                        <div className='grid grid-cols-3 gap-5 p-4'>
                            {months.map((month, index) => (
                                <button key={index} className={"p-5 text-center shadow-md hover:border-solid hover:border-red-800 hover:border-2 hover:text-red-80 " + (selectedMonths.length !== 0 ? selectedMonths.find((ele) => {
                                    return ele===month
                                }) ? "border-red-800 border-2 border-solid text-red-800" : "" : "")} onClick={() => {
                                    if (selectedMonths.includes(month)) {
                                        setSelectedMonths(selectedMonths.filter((ele) => {
                                            return ele !== month
                                        }))
                                    } else {
                                        setSelectedMonths([...selectedMonths, month])
                                    }
                                }}>{getMonthString(month.split('.')[0])} {month.split('.')[1]}</button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='w-3/4'>
                    <TripPallete />
                </div>
            </div>
        </div>
    )
}

export default Trips   
