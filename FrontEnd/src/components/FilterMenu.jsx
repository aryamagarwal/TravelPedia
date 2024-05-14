import React from 'react'
import { IoIosRemoveCircle } from 'react-icons/io'
function FilterMenu(props) {
    return (
        <div className={`${props.filterMenu ? "flex absolute z-30 xl:hidden" : "hidden"} flex-col my-7 p-7 w-1/4 xl:flex rounded-lg  top-8 shadow-lg shadow-gray-400 bg-white`}>
            <button className={`${props.filterMenu ? "block" : "hidden"} absolute top-2 left-1 text-3xl text-red-800`} onClick={() => props.setFilterMenu(false)}>X</button>
            <button className=" w-full mt-3  border-solid border-red-800 text-red-800 text-xl border-2 p-1 rounded-full hover:text-white hover:bg-red-800  " onClick={() => {
                props.setClearFilters(true)
            }}>Clear Filters</button>
            <div className=" text-red-800 font-bold my-5">
                <h1 className="text-2xl">Destinations</h1>
                {/* <div>
           <Searchbar setResults={setResults} />
          <input
            type="text"
            placeholder="Add Destinations"
            className="border-solid border-red-800 border-2 p-2 text-red-800"
          />
          <select className="border-solid border-red-800 border-2 p-2 text-red-800">
            <option value="">Select an item</option>
            {items.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}
          </select> */}
            </div>


            <div className="list flex w-full flex-col">
                {props.items.length > 0 && props.items.map((item, i) => (
                    <div
                        key={i}
                        className="flex flex-row gap-2 hover:bg-red-100 text-black p-1 text-3xl  w-full my-1"
                    >
                        <input
                            className="accent-red-200"
                            type="checkbox"
                            onChange={() => props.handleOnChange(item)}
                            checked={props.statusList.includes(item)}
                        />
                        <label key={i} className="text-2xl ">{item}</label>
                    </div>
                ))}
            </div>

            {/* <hr className="h-2 bg-gray-300 w-full rounded-full my-5"/> */}
            <div className="text-left font-bold text-red-800 text-2xl my-5">
                Budget
            </div>
            <input
                type="range"
                min="0"
                max="150000"
                step="100"
                value={props.amount}
                className="accent-red-800 w-full"
                onChange={(e) => props.setAmount(e.target.value)}
            />
            <div className="text-red-800 text-right text-2xl"><span>Rs. {(parseInt(props.amount)).toLocaleString('en-IN')}</span><span className="text-lg text-gray-500"> /person</span></div>
            <div className="text-left font-bold text-red-800 text-2xl mt-5">
                Rooms & Guests
            </div>
            {props.rooms.map((room, index) => (
                <div
                    key={index}
                    className="flex flex-col gap-4 justify-center items-center text-center my-5 drop-shadow-xl bg-white text-black p-2 text-md w-full align-middle"
                >
                    <div className=" w-full flex justify-between">
                        <h1 className="text-xl font-bold text-gray-800">Room {index + 1}</h1>
                        {index !== 0 ? (
                            <button onClick={() => props.handleRemoveRoom(index)}><IoIosRemoveCircle className="text-red-800 text-3xl" /></button>
                        ) : (
                            <button
                                className="text-red-400 text-3xl"
                                disabled
                                onClick={() => props.handleRemoveRoom(index)}
                            >
                                <IoIosRemoveCircle />
                            </button>
                        )}
                    </div>
                    <hr />
                    <div className="flex flex-col lg:flex-row w-full items-center justify-between">
                        <div className="flex flex-col text-center">
                            <div className="font-bold text-gray-600"><h1>Adults</h1></div>
                            <div className="flex flex-row gap-4 py-2 px-1 text-black bg-white items-center  shadow-black shadow-sm">
                                <button
                                    className=" font-bold p-1 rounded-md text-3xl"
                                    onClick={(e) => props.handleCountDecrement(index, "adults")}
                                >
                                    -
                                </button>
                                <h1 className="text-2xl">{room.adults}</h1>
                                <button
                                    className=" font-bold p-1 rounded-md text-3xl"
                                    onClick={() => props.handleCountIncrement(index, "adults")}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="font-bold text-gray-600"><h1>Children</h1></div>
                            <div className="flex flex-row gap-4 py-2 px-1 text-black bg-white items-center  shadow-black shadow-sm">
                                <button
                                    className=" font-bold p-1 rounded-md text-3xl"
                                    onClick={(e) => props.handleCountDecrement(index, "children")}
                                >
                                    -
                                </button>
                                <h1 className="text-2xl">{room.children}</h1>
                                <button
                                    className=" font-bold p-1 rounded-md text-3xl"
                                    onClick={() => props.handleCountIncrement(index, "children")}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            ))}
            {props.rooms.length <= 4 ? (
                <button
                    className=" p-2 mt-4 text-red-800 rounded-3xl hover:bg-red-800 hover:text-white border-solid border-red-800 border-2"
                    onClick={props.handleAddRoom}
                >
                    Add Room
                </button>
            ) : null}
            {/* <hr className="h-2 bg-gray-300 w-full rounded-full my-5"/> */}
            <div className="text-left font-bold text-red-800 text-2xl my-8">
                Holiday Duration
            </div>
            <div className="flex flex-row  text-black shadow-black w-full shadow-sm font-bold text-2xl items-center justify-center gap-10   p-1 ">
                <button
                    className=" font-bold p-1 rounded-md text-3xl"
                    onClick={props.handleDayCountDecrement}
                >
                    -
                </button>
                <h1 className="whitespace-nowrap text-2xl">{props.dayCount + " Days"} </h1>
                <button
                    className=" font-bold p-1 rounded-md text-3xl"
                    onClick={props.handleDayCountIncrement}
                >
                    +
                </button>
            </div>
            <div className="w-full text-center flex items-center justify-between font-bold text-red-800 text-xl mt-8">
                <h1 className="whitespace-nowrap w-70"> Start Date</h1>
                <input
                    type="date"
                    value={props.startDate}
                    min={props.currentDate}
                    className="text-md font-bold w-full bg-white p-2 accent-red-800 text-black text-lg"
                    onChange={props.handleStartDateChange}
                />
            </div>

            <div className=" w-full text-center flex items-center justify-between font-bold text-red-800 text-xl mt-8">
                <h1 className="whitespace-nowrap w-70"> End Date</h1>
                <input
                    type="date"
                    value={props.endDate}
                    min={props.startDate}
                    max={props.maxEndDate}
                    className="text-md font-bold bg-white  p-2 w-full accent-red-800 text-black text-lg"
                    onChange={props.handleEndDateChange}
                />
            </div>

        </div>

    )
}

export default FilterMenu
