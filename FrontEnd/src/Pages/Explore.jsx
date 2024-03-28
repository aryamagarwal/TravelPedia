import React from "react"
const Explore = () => {
  const options=[
    {
      "name": "category",
      "options" : [
        "--category--",
        "Food",
        "Destinations",
        "Hotels"
      ],
    },
    {
    "name": "state",
    "options": [
      "--state--",
        "Rajasthan",
        "UP",
        "Delhi"
      ]
    }
  ]
  return (
    <>
    <div className="flex justify-center items-center my-5 gap-10 p-10">
    
    
    <div className="rounded-full bg-red-800 w-full h-auto flex justify-evenly gap-8 p-8 my-4">
    <h1 className="text-6xl font-bold text-white mr-8">Explore</h1>
      {
        (options.map((e)=>(
          <select className="focus:ring-blue-500 focus:border-blue-500 w-full text-black rounded bg-red-200 p-2"  defaultValue={`--${e.name}--`} name={e.name} id={e.name}>
            {
              e.options.map((val)=>(
                <option className=" bg-red-100 text-center p-2" value={val} >{val}</option>
              ))
            }
          </select>
        )
        ))
      }
       
    </div>
    </div>
    </>
  )
}

export default Explore
