import React from 'react'
import { AiOutlineMail, AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
function Package() {
  const menu = [
    { title: "The Essence", details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates adipisci recusandae a error alias soluta, nisi voluptas facilis nobis optio, odio quaerat repudiandae nulla ut neque provident non nostrum earum?" },
    {
      title: "Itenirary", details: [
        { dayNo: "1", dayDetails: "Arrival at Delhi", dayMoreDetails: "Arrival at Delhi and check in to the hotel" },
        { dayNo: "2", dayDetails: "Delhi to Agra", dayMoreDetails: "Delhi to Agra and check in to the hotel" },
        { dayNo: "3", dayDetails: "Agra to Jaipur", dayMoreDetails: "Agra to Jaipur and check in to the hotel" },
        { dayNo: "4", dayDetails: "Jaipur to Udaipur", dayMoreDetails: "Jaipur to Udaipur and check in to the hotel" },
        { dayNo: "5", dayDetails: "Udaipur to Dungarpur", dayMoreDetails: "Udaipur to Dungarpur and check in to the hotel" },
        { dayNo: "6", dayDetails: "Dungarpur to Barli", dayMoreDetails: "Dungarpur to Barli and check in to the hotel" },
        { dayNo: "7", dayDetails: "Barli to Delhi", dayMoreDetails: "Barli to Delhi and check in to the hotel" }
      ]
    },
    { title: "Budget", details: "Budget details here" },
    { title: "Review", details: "Review details here" },
    { title: "Info", details: "Info details here" }
  ];
  const [selectedMenu, setSelectedMenu] = React.useState(menu[0].title);
  const [itinerayDetails, setItineraryDetails] = React.useState(false);
  // const properties = "h-auto w-full justify-center bg-red-200 gap-5"
  return (
    <div>
      <div className='w-full bg-red-800 h-auto flex flex-row mt-3 '>
        {menu.map((item, index) => (
          <button
            key={index}
            className={selectedMenu === item.title ? "text-white p-4 hover:bg-red-600 bg-red-600 font-bold" : "text-white p-4 hover:bg-red-700 font-bold"}
            onClick={() => setSelectedMenu(item.title)}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div className="h-auto w-full justify-center bg-red-200 gap-5">
        {menu.map((item, index) => (
          <div key={index} className={selectedMenu === item.title ? "flex flex-row" : "hidden"}>
            <div className="flex flex-col w-full text-red-900 text-2xl m-5 mr-0">
              {item.title === menu[0].title ? item.details : null}
              {item.title === menu[1].title ? (
                <div >
                  <iframe
                    className='m-3 mb-6'
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387131.6974249316!2d-74.2598651!3d40.6971494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sca!4v1634112345678!5m2!1sen!2sca"
                    width="100%"
                    height="400"
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                  <button
                    className="text-white p-4 flex flex-row items-center justify-center gap-3 hover:bg-red-600 bg-red-800 font-bold float-right"
                    onClick={() => {
                      setItineraryDetails(!itinerayDetails);
                    }}
                  >
                    {itinerayDetails === true ? (
                      <AiOutlineMinusCircle />
                    ) : (
                      <AiOutlinePlusCircle />
                    )}
                    Details
                  </button>
                  <ul>
                    {item.details.map((day, index) => (
                      <li key={index}>
                        <div className="flex flex-row gap-3 h-full items-center">
                          <div
                            className={
                              itinerayDetails === true
                                ? "clip-path-rhombus bg-red-800 h-full  text-white p-10 my-8"
                                : ""
                            }
                          >
                            <h1>D-{day.dayNo}</h1>
                          </div>
                          <div className="flex flex-col h-full">
                            <p className="font-bold">{day.dayDetails}</p>
                            {itinerayDetails === true ? <p>{day.dayMoreDetails}</p> : null}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
            <div className="flex flex-col w-4/6 p-1 items-center  my-5 text-white">
              <div className="bg-red-800 w-4/6 flex flex-col my-4 justify-center items-center p-5">
                <h1 className="font-bold">Key Points of the tour</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates adipisci recusandae a error alias soluta, nisi voluptas facilis nobis optio, odio quaerat repudiandae nulla ut neque provident non nostrum earum?
                </p>
              </div>
              <div className="bg-red-800 w-4/6 flex flex-col my-4 justify-center items-center p-5">
                <AiOutlineMail className="text-6xl" />
                <p> Need Help?</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Package
