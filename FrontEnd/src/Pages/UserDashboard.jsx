import React from 'react'
import Block from '../components/block'
import avatar from '../assets/avatar.jpg'
import { useState, useEffect } from 'react'
import useFetch from '../components/useFetch'
import { useParams } from 'react-router-dom'
import { FaCity } from "react-icons/fa";
const UserDashboard = () => {
  const { id } = useParams();

  const { data: data_dest, isPending, Error } = useFetch('http://localhost:8000/destinations');

  const { data: cityList, isPending_city, Error_city } = useFetch('http://localhost:8000/cityList');
  const { data: data_dest2, isPending_dest2, Error_dest2 } = useFetch('http://localhost:8000/TOP_Destinations');

  let cities = [];

  if (cityList) {
    cities = cityList.cities;
  }
  else {
    console.log("error");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/destinations', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)

    })
      .then(() => {
        console.log("New destination Added");
      })


  };


  const [dest, setdest] = useState('LUCKNOW');
  const [days, setdays] = useState('');
  const [bud, setbud] = useState('');
  const data = { dest, days, bud };






  return (
    <>
      <Block></Block>
      <div className="flex flex-row justify-between gap-6">


        <div className='flex justify-between'>
          <div>
            <img className="pt-12 ml-20 w-20 h-32 rounded-full" src={avatar} alt="img" />
          </div>
          <div className='flex flex-col'>
            <h1 className="text-6xl pt-12 pl-32">Welcome Back! {id}</h1>
            <p className="pl-32 mr-32 text-lg">Welcome to your gateway to adventure and relaxation, where wanderlust meets convenience. Explore the world, one click at a time, and let us be your compass on the journey of a lifetime.</p>
            <div className='shadow-sm pb-12 mt-16 mr-4 bg-gray-50 rounded-3xl '> <center><div className="bg-red-800 text-white text-4xl w-48 rounded-lg mt-8">MY PLANS</div></center>
              <div className='flex gap-4 flex-wrap h-auto'>
                <div>{Error && <div>Error</div>}</div>
                <div>{!data_dest && <center><div className='text-2xl'>Loading...</div></center>}</div>
                <div className='grid grid-cols-5 justify-between gap-x-4 gap-y-2'>{data_dest && data_dest.map((data_db) => (
                  <div className="flex flex-col justify-items-start mx-4 mt-4 w-52 h-52 shadow-md hover:shadow-2xl" ><h2 className='text-3xl m-4'><FaCity />{data_db.dest}</h2><h3 className='text-md pl-8 mt-4'>DAYS:{data_db.days}</h3><h3 className='text-md pl-8 '>BUDGET:{data_db.bud}</h3></div>
                ))}</div></div></div>

            <div className='shadow-sm pb-12 mt-16 mr-4 bg-gray-50 rounded-3xl mb-40'><center><div className="bg-red-800 text-white text-4xl w-80 rounded-lg  mt-8 ">TOP DESTINATIONS</div></center>
              <div className='flex flex-row mb-8'>
                <div>{Error && <div>Error</div>}</div>
                <div>{!data_dest2 && <center><div className='text-2xl'>Loading...</div></center>}</div>
                {data_dest2 && <div className='grid grid-cols-5 gap-x-4 gap-y-2'>{data_dest && data_dest2.map((data_db) => (
                  <div className="flex flex-col justify-items-start mx-4 mt-4 w-52 h-52 shadow-md hover:shadow-2xl" ><h2 className='text-3xl m-4'><FaCity />{data_db.dest}</h2><h3 className='text-md pl-8 mt-4'>DAYS:{data_db.days}</h3><h3 className='text-md pl-8 '>PRICE:{data_db.bud}</h3></div>
                ))}</div>}</div></div>
          </div>
        </div>

        <div className="flex flex-col box-content shadow-md rounded-3xl mt-12 pb-16 mb-4 mr-12 bg-gray-50 h-360 ">

          <div className="m-4 mb-12">
            <center>
              <div className="bg-red-800 text-white text-4xl w-80 rounded-lg  "><b><center>Start Planning your next GetAway</center></b></div>
            </center>
            {/* //enter your dream destinations
        //data fetch add delete */}


          </div>
          <div className="m-4">
            <center>
              <div className="bg-red-800 text-white text-lg w-60 rounded-lg"><b><center>Where to escapade ?</center></b></div>
            </center>
            <div className='pt-4'>
              <form onSubmit={handleSubmit}>
                <div className="inputBox flex relative items-center my-3 h-12 w-full ">
                  {/* <input className="bg-transparent w-full p-5 h-full text-xl rounded-3xl outline-none border-2 border-cyan-100" type="select" placeholder="Enter the Destination" value={dest} onChange={(e)=>setdest(e.target.value)} required /> */}
                  <select className="bg-transparent w-full  h-full text-xl pl-4 rounded-3xl outline-none border-2  border-cyan-100" value={dest} onChange={(e) => setdest(e.target.value)} >
                    {cityList && cities.map((e) => <option value={e} key={e}>{e}</option>)}
                  </select>

                </div>

                <center><div className="bg-red-800 text-white text-lg w-44 rounded-lg mt-8 mb-8"><b><center>The Travel Duration</center></b></div></center>
                <div className="inputBox flex relative items-center my-3 h-12 w-full ">
                  <input className="bg-transparent w-full p-5 h-full text-xl rounded-3xl outline-none border-2 border-cyan-100" type="text" placeholder="Enter the Travel Duration" value={days} onChange={(e) => setdays(e.target.value)} required />

                </div>
                <center><div className="bg-red-800 text-white text-lg w-32 rounded-lg mt-8 mb-8"><b><center>The Budget</center></b></div></center>
                <div className="inputBox flex relative items-center my-3 h-12 w-full ">
                  <input className="bg-transparent w-full p-5 h-full text-xl rounded-3xl outline-none border-2 border-cyan-100" type="text" placeholder="Enter the Budget" value={bud} onChange={(e) => setbud(e.target.value)} required />

                </div>

                <center><button className='text-center hover:bg-red-800 bg-red-600 text-white rounded-3xl p-3 pl-5 pr-5 mt-16' >Add to Destination List</button></center>


              </form>
            </div>
          </div>
        </div>


      </div>
    </>
  )
}

export default UserDashboard
