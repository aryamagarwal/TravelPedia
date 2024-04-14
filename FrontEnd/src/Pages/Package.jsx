import React from "react";
import { useState, useEffect } from "react";
import useFetch from "../components/useFetch";
import { useParams } from "react-router-dom";
// import img from "../assets/video/video_bg.mp4";
import img from "../assets/The-Maharaja-Experience.png";
import { FaStar } from "react-icons/fa";
import img_specialist from "../assets/Akshat_singh.jpg";

import {
  AiOutlineMail,
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
} from "react-icons/ai";
// import { useParams } from "react-router-dom";

function Package() {
  const { id } = useParams();
  const title = id.split("-").join(" ");
  const {
    data: menu,
    menu_isPending,
    menu_Error,
  } = useFetch("http://localhost:8000/menus");

  // const menu = [
  //   {
  //     title: "The Essence",
  //     details:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates adipisci recusandae a error alias soluta, nisi voluptas facilis nobis optio, odio quaerat repudiandae nulla ut neque provident non nostrum earum?",
  //   },
  //   {
  //     title: "Itenirary",
  //     details: [
  //       {
  //         dayNo: "1",
  //         dayDetails: "Arrival at Delhi",
  //         dayMoreDetails: "Arrival at Delhi and check in to the hotel",
  //       },
  //       {
  //         dayNo: "2",
  //         dayDetails: "Delhi to Agra",
  //         dayMoreDetails: "Delhi to Agra and check in to the hotel",
  //       },
  //       {
  //         dayNo: "3",
  //         dayDetails: "Agra to Jaipur",
  //         dayMoreDetails: "Agra to Jaipur and check in to the hotel",
  //       },
  //       {
  //         dayNo: "4",
  //         dayDetails: "Jaipur to Udaipur",
  //         dayMoreDetails: "Jaipur to Udaipur and check in to the hotel",
  //       },
  //       {
  //         dayNo: "5",
  //         dayDetails: "Udaipur to Dungarpur",
  //         dayMoreDetails: "Udaipur to Dungarpur and check in to the hotel",
  //       },
  //       {
  //         dayNo: "6",
  //         dayDetails: "Dungarpur to Barli",
  //         dayMoreDetails: "Dungarpur to Barli and check in to the hotel",
  //       },
  //       {
  //         dayNo: "7",
  //         dayDetails: "Barli to Delhi",
  //         dayMoreDetails: "Barli to Delhi and check in to the hotel",
  //       },
  //     ],
  //   },
  //   { title: "Budget" },
  //   {
  //     title: "Review",
  //     details: [
  //       {
  //         name: "John Doe",
  //         review:
  //           "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates adipisci recusandae a error alias soluta, nisi voluptas facilis nobis optio, odio quaerat repudiandae nulla ut neque provident non nostrum earum?",
  //         date: "2021-10-13",
  //       },
  //       {
  //         name: "Jane Doe",
  //         review:
  //           "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates adipisci recusandae a error alias soluta, nisi voluptas facilis nobis optio, odio quaerat repudiandae nulla ut neque provident non nostrum earum?",
  //         date: "2021-10-13",
  //       },
  //     ],
  //   },
  // ];
  const [selectedMenu, setSelectedMenu] = React.useState();
  const [itinerayDetails, setItineraryDetails] = React.useState(false);
  const items = ["The Essence", "Itinerary", "Review", "Info"];

  useEffect(() => {
    setSelectedMenu(items[0]);
  }, [items]);

  useEffect(() => {
    if (menu && !menu_isPending && !menu_Error) {
      setSelectedMenu(menu[0].title);
    }
  }, [menu, menu_isPending, menu_Error]);

  console.log(title);
  const {
    data: pack,
    isPending,
    Error,
  } = useFetch("http://localhost:8000/package");

  const image = "../assets/" + id + ".png";

  useEffect(() => {
    if (pack) {
    }
  }, [pack]);

  // const img_display = require("../assets/" + img);

  const properties = "h-auto w-full justify-center bg-red-200 gap-5";

  return (
    <div>
      <div className=" relative h-screen">
        <div
          className="item text-center align-items-end bg-cover h-4/6"
          style={{
            backgroundImage:
              "url('https://www.indianexperience.com/assets/uploads/Jodhpur-fort.jpg')",
          }}
        >
          <div>
            <div>
              <div className="pt-96  text-4xl text-white font-extrabold tracking-wide">
                {title.toUpperCase()}
              </div>
              <div className="flex justify-center pt-8 tracking-widest pb-20">
                <FaStar className="text-yellow-500 text-2xl"></FaStar>
                <FaStar className="text-yellow-500 text-2xl"></FaStar>
                <FaStar className="text-yellow-500 text-2xl"></FaStar>
                <FaStar className="text-yellow-500 text-2xl"></FaStar>
                <FaStar className="text-white text-2xl"></FaStar>
              </div>
            </div>
          </div>
        </div>
        <center>
          <div className="flex flex-row">
            <div className=" absolute  mt-20 top-1/2  ">
              <div className="flex flex-row">
                <div className="bg-red-800 w-3/5 h-1/5 ml-40  text-white rounded-lg ">
                  <div className="mr-48 text-2xl font-bold mt-8 text-left ml-4">
                    A Romantic Rendezvous!!
                  </div>
                  <p className="mt-4 text-left ml-8 text-xl mb-12 ">
                    “THE MAHARAJA EXPERIENCE”, is a splendid Golden tour,
                    through which Indian Experience offers you a romantic escape
                    into the lap of luxury, to let you create memories for life.
                    An Indulgence to explore the exotic ends of the world and
                    break away from the ordinary. Witness the grandeur of The
                    Taj in Agra. Delve deep into Rajasthan’s most palatial
                    Palace Hotels that make you feel no less than a King or a
                    Queen.
                  </p>
                  <div className="flex justify-evenly ">
                    <div className="flex-col justify-center">
                      <div className="text-xl tracking-wide font-bold">
                        Art & Culture
                      </div>
                      <div className="flex mb-4">
                        <div className="bg-[url('https://www.indianexperience.com/front/images/flower-icon.png')] h-6 w-6"></div>
                        <div className="bg-[url('https://www.indianexperience.com/front/images/flower-icon.png')] h-6 w-6"></div>
                        <div className="bg-[url('https://www.indianexperience.com/front/images/flower-icon.png')] h-6 w-6"></div>
                        <div className="bg-[url('https://www.indianexperience.com/front/images/flower-icon.png')] h-6 w-6"></div>
                        <div className="bg-[url('https://www.indianexperience.com/front/images/flower-icon.png')] h-6 w-6"></div>
                      </div>
                    </div>
                    <div className="flex-col justify-center align-middle">
                      <div className="text-xl tracking-wide font-bold">
                        OffBeat Experience
                      </div>
                      <center>
                        <div className="flex mb-4 ml-8">
                          <div className="bg-[url('https://www.indianexperience.com/front/images/flower-icon.png')] h-6 w-6"></div>
                          <div className="bg-[url('https://www.indianexperience.com/front/images/flower-icon.png')] h-6 w-6"></div>
                          <div className="bg-[url('https://www.indianexperience.com/front/images/flower-icon.png')] h-6 w-6"></div>
                          <div className="bg-[url('https://www.indianexperience.com/front/images/flower-icon.png')] h-6 w-6"></div>
                          <div className="bg-[url('https://www.indianexperience.com/front/images/flower-icon.png')] h-6 w-6"></div>
                        </div>
                      </center>
                    </div>
                    <div className="flex-col">
                      <div className="text-xl tracking-wide font-bold">
                        Nature Observation
                      </div>

                      <div className="flex mb-4 ml-8">
                        <div className="bg-[url('https://www.indianexperience.com/front/images/flower-icon.png')] h-6 w-6"></div>
                        <div className="bg-[url('https://www.indianexperience.com/front/images/flower-icon.png')] h-6 w-6"></div>
                        <div className="bg-[url('https://www.indianexperience.com/front/images/flower-icon.png')] h-6 w-6"></div>
                        <div className="bg-[url('https://www.indianexperience.com/front/images/flower-icon.png')] h-6 w-6"></div>
                        <div className="bg-[url('https://www.indianexperience.com/front/images/flower-icon.png')] h-6 w-6"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-red-800 w-1/5 h-1/5 ml-8 text-white rounded-lg">
                  <div className="tracking-widest mt-8 font-bold text-2xl">
                    YOUR SPECIALIST
                  </div>
                  <div className="flex justify-start">
                    <div className="h-48 w-28 ml-8 ">
                      <img
                        className="pt-12 w-28 h-48 rounded-lg"
                        src={img_specialist}
                        alt="img"
                      />
                    </div>

                    <div className="mr-12 mt-12 ml-4">
                      <div className="mt-8 text-xl font-semibold ">
                        Akshat Singh
                      </div>
                      <div className="mt-2 text-lg">0091-8587902207 </div>
                      <div className="mt-2 text-lg">PRICE:2000 per trip</div>
                      <div className="w-full mt-4"></div>
                    </div>
                  </div>
                  <button className="bg-yellow-500 mt-12 w-11/12 font-bold text-2xl pb-3 pt-3 mb-5 rounded-lg ">
                    BOOK NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        </center>
      </div>

      <div className="mb-8 text-white">{id}</div>

      {!menu && (
        <div className="w-full bg-red-800 h-auto flex flex-row mt-3 mb-20  ">
          {items.map((item, index) => (
            <button
              key={index}
              className={
                selectedMenu === item
                  ? "text-white p-4 hover:bg-red-600 bg-red-600 font-bold"
                  : "text-white p-4 hover:bg-red-700 font-bold"
              }
              // onClick={() => setSelectedMenu(item.title)}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {menu && (
        <div>
          <div className="w-full bg-red-800 h-auto flex flex-row mt-3  ">
            {menu.map((item, index) => (
              <button
                key={index}
                className={
                  selectedMenu === item.title
                    ? "text-white p-4 hover:bg-red-600 bg-red-600 font-bold"
                    : "text-white p-4 hover:bg-red-700 font-bold"
                }
                onClick={() => setSelectedMenu(item.title)}
              >
                {item.title}
              </button>
            ))}
          </div>
          <div className="h-auto w-full justify-center bg-red-200 gap-5">
            {menu.map((item, index) => (
              <div
                key={index}
                className={
                  selectedMenu === item.title ? "flex flex-row" : "hidden"
                }
              >
                <div className="flex flex-col w-full text-red-900 text-2xl m-5 mr-0">
                  {item.title === menu[0].title ? item.details : null}
                  {item.title === menu[1].title ? (
                    <div>
                      <iframe
                        className="m-3 mb-6"
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
                                {itinerayDetails === true ? (
                                  <p>{day.dayMoreDetails}</p>
                                ) : null}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {item.title === menu[2].title ? (
                    <div>
                      <div className="text-xl">
                        <div class="w-full flex flex-row gap-8 p-5">
                          <div class="w-1/2 ">
                            <h4 class="font-bold ">Our price Include</h4>
                            <div class="text-xl">
                              <ul>
                                <li className="list-disc">
                                  Accommodation based on two persons sharing one
                                  double room with breakfasts included as
                                  mentioned in the itinerary
                                </li>
                                <li className="list-disc">
                                  Transfer from the airport to the first hotel
                                  and from the last hotel back to the
                                  airport&nbsp;
                                </li>
                                <li className="list-disc">
                                  All transfers and sightseeing by private
                                  Air-Conditioned vehicle with a private
                                  chauffeur.
                                </li>
                                <li className="list-disc">
                                  Personal and experienced tour guide throughout
                                  the tour from arrival to departure.
                                </li>
                                <li className="list-disc">
                                  Fuel charges, road tax, toll and parking
                                  charges.
                                </li>
                                <li className="list-disc">
                                  All hotel taxes included.
                                </li>
                                <li className="list-disc">
                                  24x7 assistance by the Team of Indian
                                  Experience.
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div class="w-1/2">
                            <h4 class="font-bold ">Our price Do Not Include</h4>
                            <div class="text-xl">
                              <ul>
                                <li className="list-disc">
                                  Accommodation based on two persons sharing one
                                  double room with breakfasts included as
                                  mentioned in the itinerary
                                </li>
                                <li className="list-disc">
                                  Transfer from the airport to the first hotel
                                  and from the last hotel back to the
                                  airport&nbsp;
                                </li>
                                <li className="list-disc">
                                  All transfers and sightseeing by private
                                  Air-Conditioned vehicle with a private
                                  chauffeur.
                                </li>
                                <li className="list-disc">
                                  Personal and experienced tour guide throughout
                                  the tour from arrival to departure.
                                </li>
                                <li className="list-disc">
                                  Fuel charges, road tax, toll and parking
                                  charges.
                                </li>
                                <li className="list-disc">
                                  All hotel taxes included.
                                </li>
                                <li className="list-disc">
                                  24x7 assistance by the Team of Indian
                                  Experience.
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div class="entry-content">
                          <p>
                            ** Additional cost will be charged for extra
                            services except mentioned in the “Inclusions” in
                            every trip.
                          </p>
                          <p>
                            <br />
                            In case of{" "}
                            <strong>cancellation of your trip</strong>, the
                            cancellation fees charged by Indian Experience will
                            be calculated according to the following scale
                          </p>
                          <p>
                            • More than 60 days before departure: 35% of the
                            total price of the trip.&nbsp;&nbsp;
                            <br />• From 60 to 31 days before departure: 40% of
                            the total price of the trip.&nbsp;&nbsp;
                            <br />• From 30 to 21 days: 40% of the total price
                            of the trip.&nbsp;&nbsp;&nbsp;
                            <br />• From 20 to 14 days: 60% of the total price
                            of the trip.&nbsp;&nbsp;
                            <br />• From 13 to 8 days: 70% of the total price of
                            the trip.&nbsp;&nbsp;
                            <br />• From 7 to 2 days: 75% of the total price of
                            the trip.&nbsp;&nbsp;
                            <br />• The day before or the day of departure: 100%
                            of the total price of the trip
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {item.title === menu[3].title ? (
                    <div className="flex flex-col justify-center items-center ">
                      <h1 className="font-bold text-3xl">
                        {item.details.length} Reviews
                      </h1>
                      {item.details.map((ele, index) => (
                        <div
                          key={index}
                          className="w-3/4 flex flex-row items-center gap-8 justify-center"
                        >
                          <div className="w-1/2 flex flex-col justify-center">
                            <img className="rounded-full" src="" alt="" />
                            <h4 className="font-bold">{ele.name}</h4>
                          </div>
                          <div className="p-8">
                            <h5 className="font-bold text-xl m-1">
                              {ele.date}
                            </h5>
                            <p>{ele.review}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
                {item.title !== menu[3].title && (
                  <div className="flex flex-col w-4/6 p-1 items-center  my-5 text-white">
                    <div className="bg-red-800 w-4/6 flex flex-col my-4 justify-center items-center p-5">
                      <h1 className="font-bold">Key Points of the tour</h1>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptates adipisci recusandae a error alias soluta,
                        nisi voluptas facilis nobis optio, odio quaerat
                        repudiandae nulla ut neque provident non nostrum earum?
                      </p>
                    </div>
                    <div className="bg-red-800 w-4/6 flex flex-col my-4 justify-center items-center p-5">
                      <AiOutlineMail className="text-6xl" />
                      <p> Need Help?</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default Package;
