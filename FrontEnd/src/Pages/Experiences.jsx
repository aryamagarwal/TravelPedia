import React, { useEffect, useState } from 'react'
import Block from '../components/block'
import trial from '../assets/slide1.jpg'
import ExperienceCard from '../components/ExperienceCard'
import bgVideo from '../assets/video/video_bg.mp4'
const Experiences = () => {

  const detail = [
    {
      "name": "xyz",
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, aut aliquam voluptatem excepturi, ipsa similique debitis modi quae dicta, hic iure placeat saepe. Distinctio doloribus temporibus impedit sunt deserunt soluta.",
      "region": "Rajasthan",
      "img": trial,
      "days": "5",
      "amount": "1800",
    },
    {
      "name": "xyz",
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, aut aliquam voluptatem excepturi, ipsa similique debitis modi quae dicta, hic iure placeat saepe. Distinctio doloribus temporibus impedit sunt deserunt soluta.",
      "region": "South India",
      "img": trial,
      "days": "5",
      "amount": "1800",
    },
    {
      "name": "xyz",
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, aut aliquam voluptatem excepturi, ipsa similique debitis modi quae dicta, hic iure placeat saepe. Distinctio doloribus temporibus impedit sunt deserunt soluta.",
      "region": "UP",
      "img": trial,
      "days": "5",
      "amount": "1800",
    },
    {
      "name": "xyz",
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, aut aliquam voluptatem excepturi, ipsa similique debitis modi quae dicta, hic iure placeat saepe. Distinctio doloribus temporibus impedit sunt deserunt soluta.",
      "region": "Himalya",
      "img": trial,
      "days": "5",
      "amount": "1800",
    },
    {
      "name": "xyz",
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, aut aliquam voluptatem excepturi, ipsa similique debitis modi quae dicta, hic iure placeat saepe. Distinctio doloribus temporibus impedit sunt deserunt soluta.",
      "region": "Kerala",
      "img": trial,
      "days": "5",
      "amount": "1800",
    },
  ]

  let items = detail.map((ex) => {
    return ex.region;
  })
  items = [...new Set(items)]
  // console.log(items);
  const [statusList, setStatusList] = useState([]);

  const handleOnChange = (item) => {
    let newList = statusList;
    if (newList.includes(item) === false) {
      newList = [...newList, item]
    }
    else {
      newList = newList.filter((ex) => ex !== item);
    }
    setStatusList(newList);
    // console.log(newList);
  }

  const [amount, setAmount] = useState(0);

  const [rooms, setRooms] = useState([{ adults: 1, children: 0 }]);

  const handleCountIncrement = (index, field, value) => {
    const updatedRooms = [...rooms];
    if (updatedRooms[index]['adults'] + updatedRooms[index]['children'] < 4)
      if ((field === 'adults' && updatedRooms[index][field] < 3) || (field === 'children'))
        updatedRooms[index][field]++;
    setRooms(updatedRooms);
  };
  const handleCountDecrement = (index, field) => {
    const updatedRooms = [...rooms];
    if (field === 'adults' && updatedRooms[index][field] == 1) return;
    if (field === 'children' && updatedRooms[index][field] == 0) return;
    updatedRooms[index][field]--;
    setRooms(updatedRooms);
  };
  const handleAddRoom = () => {
    setRooms([...rooms, { adults: 1, children: 0 }]);
  };
  console.log(rooms.length);
  const handleRemoveRoom = (index) => {
    const updatedRooms = [...rooms];
    updatedRooms.splice(index, 1);
    setRooms(updatedRooms);
  };
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [startDate, setStartDate] = useState(currentDate);
  const [endDate, setEndDate] = useState(currentDate);
  const [dayCount, setDayCount] = useState(0);
  const handleDayCountIncrement = () => {
    if (dayCount === 15) return;
    setDayCount(dayCount + 1);
  }
  const handleDayCountDecrement = () => {
    if (dayCount === 0) return;
    setDayCount(dayCount - 1);
  }

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };
  let maxDate = new Date(startDate);
  maxDate.setDate(maxDate.getDate() + 15);
  const [maxEndDate, setMaxEndDate] = useState(maxDate.toISOString().split('T')[0]);
  useEffect(() => {
    maxDate = new Date(startDate);
    maxDate.setDate(maxDate.getDate() + 15);
    setMaxEndDate(maxDate.toISOString().split('T')[0]);
    const limitDate = new Date(startDate);
    limitDate.setDate(limitDate.getDate() + dayCount);
    const formattedLimitDate = limitDate.toISOString().split('T')[0];
    setEndDate(formattedLimitDate);
  }, [startDate]);
  useEffect(() => {
    const limitDate = new Date(startDate);
    limitDate.setDate(limitDate.getDate() + dayCount);
    const formattedLimitDate = limitDate.toISOString().split('T')[0];
    setEndDate(formattedLimitDate);
  }, [dayCount])
  useEffect(() => {
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    days !== dayCount && days >= 0 ? setDayCount(days) : null;
  }, [endDate]);

  return (
    <div>

      <div className="header w-full  overflow-hidden text-center h-screen/2 text-screen/5 text-white font-bold">
        <video className='w-full' autoPlay loop muted style={{ background: 'linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.9))' }}>
          <source src={bgVideo} type='video/mp4' />
        </video>
        <div className='absolute top-1/4 left-1/4 text-screen4 p-3 bg-red-800 text-white'>
          Book the Best Experiences in India
        </div>
      </div>

      <Block />
      <div className="flex flex-row items-start">
        <div className="flex flex-col my-7 p-7 w-1/3 text-center justify-center sticky items-center">
          <div className="text-center text-red-800 font-bold text-2xl ">
            Destinations
          </div>
          <div className="list flex w-full flex-col">
            {
              items.map((item, i) => (
                <div key={i} className="flex flex-row gap-2 bg-red-800 text-white p-3 text-xl border-white border-solid border-2 w-full">
                  <input className="accent-red-200" type='checkbox' onChange={(e) => handleOnChange(item)} checked={statusList.includes(item)} />
                  <label key={i}>{item}</label>
                </div>
              ))
            }
            <div className="text-center font-bold text-red-800 text-2xl">
              Amount
            </div>
            <input type="range" min="0" max="5000" step="100" className="accent-red-800" onChange={(e) => setAmount(e.target.value)} />
            <div className="text-red-800 ">{amount}</div>
          </div>
          <div className="text-center font-bold text-red-800 text-2xl">
            Rooms&Guests
          </div>
          {rooms.map((room, index) => (
            <div key={index} className="flex flex-row gap-8 text-center bg-red-800 text-white p-3 text-xl border-white border-solid border-2 w-full align-middle">
              <div >
                Room {index + 1}
              </div>
              <div className="flex flex-col text-center">
                <div>
                  Adults
                </div>
                <div className="flex flex-row gap-4 text-red-800 bg-white items-center">
                  <button className=" font-bold p-1 rounded-md" onClick={(e) => handleCountDecrement(index, 'adults')}>-</button>
                  {room.adults}
                  <button className=" font-bold p-1 rounded-md" onClick={() => handleCountIncrement(index, 'adults')}>+</button>
                </div>
              </div>
              <div className="flex flex-col">
                <div>
                  Children
                </div>
                <div className="flex flex-row gap-4 text-red-800 bg-white items-center">
                  <button className=" font-bold p-1 rounded-md" onClick={(e) => handleCountDecrement(index, 'children')}>-</button>
                  {room.children}
                  <button className=" font-bold p-1 rounded-md" onClick={() => handleCountIncrement(index, 'children')}>+</button>
                </div>
              </div>
              {index !== 0 ? <button onClick={() => handleRemoveRoom(index)}>Remove</button> : <button className="text-grey-100" disabled onClick={() => handleRemoveRoom(index)}>Remove</button>}

            </div>

          ))}
          {rooms.length <= 4 ? <button className="border-solid border-red-800 border-2 p-3 text-red-800" onClick={handleAddRoom}>Add Room</button> : null}
          <div className="text-center font-bold text-red-800 text-2xl">Holiday Duration (Days)</div>
          <div className="flex flex-row  text-white font-bold text-2xl items-center justify-center gap-10 border-solid border-red-800 border-2 p-2 w-1/2 bg-red-800">
            <button className=" font-bold p-1 rounded-md text-4xl" onClick={handleDayCountDecrement}>-</button>
            {dayCount}
            <button className=" font-bold p-1 rounded-md text-4xl" onClick={handleDayCountIncrement}>+</button>
          </div>
          <div className="text-center font-bold text-red-800 text-2xl">Start Date</div>
          <input type="date" value={startDate} min={currentDate} className="text-2xl font-bold border-solid bg-red-800 border-red-800 border-2 p-4 w-1/2 accent-red-800 text-white" onChange={handleStartDateChange} />
          <div className="text-center font-bold text-red-800 text-2xl">End Date</div>
          <input type="date" value={endDate} min={startDate} max={maxEndDate} className="text-2xl font-bold bg-red-800 border-solid border-red-800 border-2 p-4 w-1/2 accent-red-800 text-white" onChange={handleEndDateChange} />
        </div>
        <div className="my-5 w-full flex flex-col">
          {
            detail.map((item, i) =>
              (statusList.length === 0 || statusList.includes(item.region)) && (parseInt(item.amount) <= amount || amount === 0) && (parseInt(item.days) == dayCount || dayCount === 0) ? (
                <ExperienceCard key={i} details={item} />
              ) : null)
          }
        </div>
      </div>
    </div>

  )
}

export default Experiences



