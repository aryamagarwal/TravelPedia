import React from "react";
import { useState, useEffect } from "react";
import useFetch from "../components/useFetch.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MdDelete } from "react-icons/md";

// import img from "../assets/video/video_bg.mp4";
import img from "../assets/The-Maharaja-Experience.png";
import { FaPencilAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import img_specialist from "../assets/Akshat_singh.jpg";
import {
  AiOutlineMail,
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
} from "react-icons/ai";
import { IsLoggedInContext } from "../App.jsx";
import Loading from "../components/Loading.jsx";
const baseUrl = "http://13.60.74.234:8085/permit"
function deleteReviewData(reviewId) {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}/reviews/delete/` + reviewId, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete review");
        }
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}
const fetchExperienceData = (title) => {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}/experiences/get/` + title)
      .then((response) => response.json())
      .then((data) => { resolve(data) })
      .catch((error) => reject(error));
  });
};
const fetchReviewData = (title) => {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}/reviews/` + title)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};
function postReviewData(reviewData) {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}/reviews/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        "experienceId": reviewData.experienceId,
        "username": reviewData.username,
        "review": reviewData.review
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
function Package() {

  const { user, isLoggedIn } = useContext(IsLoggedInContext);
  const [showReviewPopUp, setShowReviewPopUp] = useState(false);
  const [updateReview, setUpdateReview] = useState(false);
  const [updateReviewId, setUpdateReviewId] = useState(0);
  const [name, setName] = useState(isLoggedIn ? user.username : "");
  const [review, setReview] = useState("");
  const navigatte = useNavigate();
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };
  const handleCancelReview = () => {
    setShowReviewPopUp(!showReviewPopUp)
    setName("");
    setReview("");
  };
  const navigate = useNavigate();
  const { id } = useParams();
  const title = id.split("-").join(" ");
  const menu = ["The Essence", "Itinerary", "Budget", "Reviews"];
  const [selectedMenu, setSelectedMenu] = React.useState(menu[0]);
  const [itinerayDetails, setItineraryDetails] = React.useState(false);
  const [detail, setDetail] = useState(null);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    // axios.get("http://localhost:8085/permit/experiences/get/" + title )
    //             .then((response) => {
    //                 const data = response.data;
    //                 setDetail(data);
    //             });
    //   fetch("http://localhost:8085/permit/experiences/get/" + title)
    //       .then((response) => response.json())
    //       .then((data) => setDetail(data))
    //       .catch((error) => console.log(error))
    // fetch("http://localhost:8085/permit/reviews/" + title)
    //       .then((response) => response.json())
    //       .then((data) => setReviews(data))
    //       .catch((error) => console.log(error))
    fetchExperienceData(title).then((data) => { setDetail(data) })
    fetchReviewData(title).then((data) => {
      setReviews(data)
    })
  }, [])
  const handleUpdateReview = () => {
    if (name && review) {
      const data = {
        reviewId: updateReviewId.toString(),
        username: name,
        review: review,
      };
      fetch(`${baseUrl}/reviews/update/` + data.reviewId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          "username": data.username,
          "review": data.review
        }),
      })
        .then((response) => response.json())
        .then(() => {
          fetchReviewData(title).then((data) => { setReviews(data); alert("Review Updated Successfully!") });
          setShowReviewPopUp(!showReviewPopUp);
          setName("");
          setReview("");
        })
        .catch((error) => {
          console.error("Error updating review data:", error);
        });

    }
  }
  const handleSubmitReview = () => {
    if (name && review) {
      const data = {
        experienceId: detail ? detail.experienceId.toString() : "0",
        username: name,
        review: review,
      };
      postReviewData(data)
        .then(() => {
          fetchReviewData(title).then((data) => {
            setReviews(data);
          });
          setShowReviewPopUp(!showReviewPopUp);
          setName("");
          setReview("");
        })
        .catch((error) => {
          console.error("Error posting review data:", error);
        });

    }
  }

  const itenirary = [
    {
      "dayNo": "1",
      "dayDetails": "Arrival at Delhi",
      "dayMoreDetails": "Arrival at Delhi and check in to the hotel"
    },
    {
      "dayNo": "2",
      "dayDetails": "Delhi to Agra",
      "dayMoreDetails": "Delhi to Agra and check in to the hotel"
    },
    {
      "dayNo": "3",
      "dayDetails": "Agra to Jaipur",
      "dayMoreDetails": "Agra to Jaipur and check in to the hotel"
    },
    {
      "dayNo": "4",
      "dayDetails": "Jaipur to Udaipur",
      "dayMoreDetails": "Jaipur to Udaipur and check in to the hotel"
    },
    {
      "dayNo": "5",
      "dayDetails": "Udaipur to Dungarpur",
      "dayMoreDetails": "Udaipur to Dungarpur and check in to the hotel"
    },
    {
      "dayNo": "6",
      "dayDetails": "Dungarpur to Barli",
      "dayMoreDetails": "Dungarpur to Barli and check in to the hotel"
    },
    {
      "dayNo": "7",
      "dayDetails": "Barli to Delhi",
      "dayMoreDetails": "Barli to Delhi and check in to the hotel"
    }
  ]

  return (
    <div>
      {!detail && <Loading />}
      {detail &&
        <div>
          <div className=" ">

            <div
              className="item text-center align-items-end bg-cover h-4/6"
              style={{
                backgroundImage:
                  "url('https://www.indianexperience.com/assets/uploads/Jodhpur-fort.jpg')",
              }}>
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
            <div className="w-full flex flex-col justify-center items-center">
              <div className="flex flex-row relative w-4/5 justify-center  h-auto gap-10 -top-14">
                <div className="bg-red-800 w-4/6 text-white rounded-lg p-5">
                  <div className="text-2xl font-bold w-full m-4 text-center ">
                    {detail.descriptionTitle}
                  </div>
                  <p className="text-left  text-xl mb-12 whitespace-pre-line ">
                    {detail ? detail.description : null}
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
                <div className="bg-red-800 w-2/6 flex flex-col items-center  text-white rounded-lg ">
                  <div className="tracking-widest mt-8 text-center font-bold text-2xl">
                    YOUR SPECIALIST
                  </div>
                  <div className="flex-col justify-start">
                    <div className="h-48 w-28 ml-8 ">
                      <img
                        className="pt-12 w-full h-auto rounded-lg"
                        src={img_specialist}
                        alt="img"
                      />
                    </div>

                    <div className="mr-12 mt-12 ml-4">
                      <div className="mt-8 text-xl font-semibold ">
                        Name: Akshat Singh
                      </div>
                      <div className="mt-2 text-lg">Mobile: 91-8587902207</div>
                      <div className="mt-2 text-lg">Price: Rs. 2000 /trip</div>
                      <div className="w-full mt-4"></div>
                    </div>
                  </div>
                  <button className="bg-yellow-500 mt-12 w-11/12 font-bold text-2xl pb-3 pt-3 mb-5 rounded-lg " onClick={() => { navigate('/checkout') }}>
                    BOOK NOW
                  </button>
                </div>
              </div>
            </div>


          </div>
      
          <div className="w-full  h-auto flex flex-row mt-3 text-md  ">
            {menu.map((item, index) => (
              <button
                key={index}
                className={
                  selectedMenu === item
                    ? "p-4   shadow-xl  shadow-gray-700  font-bold text-lg border-b-8 border-red-800 border-solid"
                    : "p-4 hover:border-red-800 hover:border-b-4 hover:border-solid shadow-lg shadow-grey-100 text-black font-bold"
                }
                onClick={() => { setSelectedMenu(item) }}
              >
                {item}
              </button>
            ))}
          </div>
          {detail && (
            <div className="h-auto w-full justify-center  ">
              <div
                className={
                  "flex flex-row"
                }
              >

                <div className="flex flex-col w-full text-black text-xl m-5 mr-0 whitespace-pre-line">
                  {selectedMenu === menu[0] ? detail.essence : null}
                  {selectedMenu === menu[1] ? (
                    <div>
                      <iframe
                        className="m-3 mb-6"
                        src={detail.location}
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
                        {itenirary.map((day, index) => (
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
                  {selectedMenu === menu[2] ? (
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
                  {selectedMenu === menu[3] ? (
                    <div className="flex flex-col justify-center items-center ">
                      <h1 className="font-bold text-3xl">
                        {reviews.length} Reviews
                      </h1>
                      {(isLoggedIn || !isLoggedIn) ? (
                        <div>
                          <button className="bg-yellow-500 mt-12 w-11/12 font-bold text-2xl pb-3 pt-3 mb-5 rounded-lg " onClick={() => { setShowReviewPopUp(!showReviewPopUp) }}>Add Review</button>
                        </div>
                      ) : null}
                      {reviews.map((ele, index) => (
                        <div
                          key={index}
                          className="w-full flex flex-row items-center justify-center "
                        >
                          <div className=" w-1/3 flex flex-col justify-center ">
                            <img className="rounded-full" src="" alt="" />
                            <h4 className="font-bold">{ele.username}</h4>
                          </div>
                          <div className=" w-1/3 p-8">
                            <h5 className="font-bold text-xl m-1">
                              {ele.creationDate.split("T")[0]}
                            </h5>
                            <p>{ele.review}</p>

                          </div>
                          <div>
                            <FaPencilAlt className="text-red-800 "
                              onClick={() => { setShowReviewPopUp(!showReviewPopUp); setUpdateReview(true); setName(ele.username); setReview(ele.review); setUpdateReviewId(ele.reviewId) }
                              } />
                            <MdDelete className="text-red-800 " onClick={() => {
                              deleteReviewData(ele.reviewId).then(() => {
                                alert("Review Deleted Successfully!")
                                fetchReviewData(title).then((data) => {
                                  setReviews(data);
                                })
                              })
                            }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
                {selectedMenu !== menu[3] && (
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
                      <AiOutlineMail className="text-6xl cursor-pointer" onClick={() => { navigate('../contactUs') }} />
                      <p> Need Help?</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {showReviewPopUp && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
              <div className="bg-white p-4 w-1/2 min-h-1/2 h-auto rounded-lg flex  flex-col justify-center">
                <h1 className="text-2xl font-bold text-center">{updateReview ? "Update Review" : "Add a Review"}</h1>
                <div className="flex flex-col">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="border border-gray-300 rounded-md p-2 mb-2"
                    onChange={(e) => handleNameChange(e)}
                    value={name}
                  />
                  <textarea
                    placeholder="Enter your review"
                    className="border border-gray-300 rounded-md p-2 mb-2"
                    onChange={(e) => handleReviewChange(e)}
                    value={review}
                  ></textarea>
                  {updateReview ? <button className="bg-blue-500 text-white rounded-md p-2" onClick={() => handleUpdateReview()}>Update</button> : <button className="bg-blue-500 text-white rounded-md p-2" onClick={() => handleSubmitReview()}>Submit</button>}
                </div>

                <button
                  className="text-red-500 font-bold"
                  onClick={() => handleCancelReview()}>Close
                </button>
              </div>
            </div>
          )}
        </div>
      }
    </div>
  )


}
export default Package;
