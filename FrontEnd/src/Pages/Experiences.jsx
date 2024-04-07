import React, { useEffect , useState } from 'react'
import Block from '../components/block'
import trial from '../assets/slide1.jpg'
import ExperienceCard from '../components/ExperienceCard'
import bgVideo from '../assets/video/video_bg.mp4'
const Experiences = () => {
  
  const detail=[
    {
      "name": "xyz",
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, aut aliquam voluptatem excepturi, ipsa similique debitis modi quae dicta, hic iure placeat saepe. Distinctio doloribus temporibus impedit sunt deserunt soluta.",
      "region": "Rajasthan",
      "img": trial,
      "amount": "1800",
    },
    {
      "name": "xyz",
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, aut aliquam voluptatem excepturi, ipsa similique debitis modi quae dicta, hic iure placeat saepe. Distinctio doloribus temporibus impedit sunt deserunt soluta.",
      "region": "South India",
      "img": trial,
      "amount": "1800",
    },
    {
      "name": "xyz",
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, aut aliquam voluptatem excepturi, ipsa similique debitis modi quae dicta, hic iure placeat saepe. Distinctio doloribus temporibus impedit sunt deserunt soluta.",
      "region": "UP",
      "img": trial,
      "amount": "1800",
    },
    {
      "name": "xyz",
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, aut aliquam voluptatem excepturi, ipsa similique debitis modi quae dicta, hic iure placeat saepe. Distinctio doloribus temporibus impedit sunt deserunt soluta.",
      "region": "Himalya",
      "img": trial,
      "amount": "1800",
    },
    {
      "name": "xyz",
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, aut aliquam voluptatem excepturi, ipsa similique debitis modi quae dicta, hic iure placeat saepe. Distinctio doloribus temporibus impedit sunt deserunt soluta.",
      "region": "Kerala",
      "img": trial,
      "amount": "1800",
    },
  ]

 let items = detail.map((ex)=>{
    return ex.region;
  })
  items=[...new Set(items)]
  // console.log(items);
  const [statusList, setStatusList] = useState([]);

  const handleOnChange = (item ) => {
    let newList=statusList;
    if(newList.includes(item)===false){
      newList=[...newList , item]
    }
    else{
      newList = newList.filter((ex)=>ex!==item);
    }
    setStatusList(newList);
    // console.log(newList);
  }
 
  
  return (
    <div>

     <div className="header w-full  overflow-hidden text-center h-screen/2 text-6xl text-white font-bold">
          <video className='w-full' autoPlay loop muted style={{background: 'linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.9))'}}>
            <source src={bgVideo} type='video/mp4'/>
          </video>
          <div className='absolute top-1/3 left-1/4'>
            Book the Best Experiences in India
          </div>
        </div>
    
      <Block />
      <div className="flex flex-row items-start">
        <div className="flex flex-col my-7 p-7 w-1/3 justify-center sticky items-center">
          <div className="text-center text-black text-2xl ">
            Destinations
          </div>
          <div className="list flex flex-col">
            {
              items.map((item, i) => (
                <div key={i} className="flex flex-row gap-2 bg-red-800 text-white p-3 text-xl border-white border-solid border-2 w-full">
                  <input className="accent-red-200" type='checkbox' onChange={(e) => handleOnChange(item)} checked={statusList.includes(item)}  />
                  <label key={i}>{item}</label>
                </div>
              ))
            }
          </div>
        </div>
        <div className="my-5 flex flex-col">
          {
            detail.map((item , i)=>
            statusList.length===0 || statusList.includes(item.region) ?(
              <ExperienceCard key={i} details={item} />
            ) : null)
          }
         
        </div>
      </div>
    </div>
  )
}

export default Experiences
