import React, { useEffect, useState } from "react";
import Block from "../components/block";
import trial from "../assets/slide1.jpg";
import ExperienceCard from "../components/ExperienceCard";
import bgVideo from "../assets/video/video_bg.mp4";
import useFetch from "../components/useFetch.jsx";
import { IoIosFunnel } from "react-icons/io";
import Pagination from "../components/Pagination.jsx";
import expbg from "../assets/expbg.webp"
import Searchbar from "../components/Searchbar.jsx";
import { IoIosClose } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpFill } from "react-icons/ri";
import { IsLoggedInContext } from "../App.jsx";
import { useContext } from "react";
import AlertBox from "../components/AlertBox.jsx";
const fetchExperiences = (url) => {

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url)
      const data = await response.json();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
const Experiences = () => {
  const { user, isLoggedIn } = useContext(IsLoggedInContext);
  const [addTitle, setAddTitle] = useState("");
  const [addDescription, setAddDescription] = useState("");
  const [addLocation, setAddLocation] = useState("");
  const [addImage, setAddImage] = useState("");
  const [addRegion, setAddRegion] = useState("");
  const [addAmount, setAddAmount] = useState();
  const [addDays, setAddDays] = useState();
  const [detail, setDetail] = useState(null);
  const [items, setItems] = useState([]);
  const [updateExperience, setUpdateExperience] = useState(false);
  const [currentExperienceId, setCurrentExperienceId] = useState(null);
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalExperiences, setTotalExperiences] = useState(0);
  const [dispSortBox, setDispSortBox] = useState(false);
  // const [showAlert , setShowAlert] = useState(false);
  // const [alertMessage , setAlertMessage] = useState("");
  // const [alertResponse , setAlertResponse] = useState(false);
  // const [results , setResults] = useState([]);
  const resetData = () => {
    setAddTitle("");
    setAddDescription("");
    setAddLocation("");
    setAddImage("");
    setAddRegion("");
    setAddAmount();
    setAddDays();
    setShowAddExperience(false);
    setUpdateExperience(false);
    setShowAlert(false);
    setAlertMessage("");
    setAlertResponse(false);
  }
  const handleUpdateExperience = (details) => {
    setCurrentExperienceId(details.experienceId);
    setAddTitle(details.title);
    setAddDescription(details.description);
    setAddLocation(details.location);
    setAddImage(details.imageUrl);
    setAddRegion(details.region);
    setAddAmount(details.amount);
    setAddDays(details.days);
    fetch("http://localhost:8085/experiences/experienceImage/" + details.title)
      .then((response) => response.blob())
      .then((blob) => {
        console.log(blob);
        var file = new File([blob], details.title, { type: "image/*", lastModified: Date.now() });
        console.log(file);
        setAddImage(file);
        setShowAddExperience(true);
        setUpdateExperience(!updateExperience);
      })
  }
  const postUpdatedExperience = async () => {
    if (confirm("Are you sure you want to update this experience?") === false) return;
    // setShowAlert(true);
    // setAlertMessage("Are you sure you want to update this experience?");
    // if(alertResponse === false) return;
    else{
    try {
      const response = await fetch("http://localhost:8085/experiences/update/" + currentExperienceId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: addTitle,
          description: addDescription,
          location: addLocation,
          region: addRegion,
          amount: addAmount,
          days: addDays,
        }),
      });
      if (response.ok) {
        try {
          const formdata = new FormData();
          formdata.append("file", addImage);
          formdata.append("title", addTitle);
          const message = await fetch("http://localhost:8085/experiences/file-upload", {
            method: "POST",
            // headers: {
            //   "Content-Type" : "multipart/form-data"
            // },
            body: formdata
          })
          if (message.ok)
            console.log("message" + message);
        }
        catch (error) {
          console.log("error" + error);
        }
        console.log("Experience updated successfully");
        fetchExperiences("http://localhost:8085/experiences/regions").then((destinations) => {
          setItems(destinations);
        });
        resetData();
      } else {
        alert("Failed to update experience");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }
  }
  useEffect(() => {

    fetchExperiences("http://localhost:8085/experiences/regions").then((regions) => {
      setItems(regions);
    });


  }, [])



  const handleAddExperience = async () => {
    if (confirm("Are you sure you want to add this experience?") === false) return;
    // setShowAlert(true);
    // setAlertMessage("Are you sure you want to add this experience?");
    // if(alertResponse === false) return;
   try {
      const response = await fetch("http://localhost:8085/experiences/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: addTitle,
          description: addDescription,
          location: addLocation,
          region: addRegion,
          amount: addAmount,
          days: addDays,
        }),
      });
      if (response.ok) {
        try {
          const formdata = new FormData();
          formdata.append("file", addImage);
          formdata.append("title", addTitle);
          const message = await fetch("http://localhost:8085/experiences/file-upload", {
            method: "POST",
            // headers: {
            //   "Content-Type" : "multipart/form-data"
            // },
            body: formdata
          })
          if (message.ok)
            console.log("message" + message);
        }
        catch (error) {
          console.log("error" + error);
        }
        console.log("New experience added successfully");
        fetchExperiences("http://localhost:8085/experiences/regions").then((destinations) => {
          setItems(destinations);
        });
        resetData();
      } else {
        alert("Failed to add new experience");
      }
    } catch (error) {
      console.log("Error:" + error);
    }
  };
  const handleDeleteExperience = async (id, title) => {
    if (confirm("Are you sure you want to delete this experience?") === false) return;
    try {
      const response = await fetch(`http://localhost:8085/experiences/delete/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const res = await fetch('http://localhost:8085/experiences/deleteImage/' + title, {
          method: "DELETE",
        });
        console.log("Experience deleted successfully");
        fetchExperiences("http://localhost:8085/experiences/regions").then((destinations) => {
          setItems(destinations);
        });
      } else {
        alert("Failed to delete experience");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const [showAddExperience, setShowAddExperience] = useState(false);

  const [statusList, setStatusList] = useState([]);

  const handleOnChange = (item) => {
    let newList = statusList;
    if (newList.includes(item) === false) {
      newList = [...newList, item];
    } else {
      newList = newList.filter((ex) => ex !== item);
    }
    setStatusList(newList);
    // console.log(newList);
  };

  const [amount, setAmount] = useState(0);

  const [rooms, setRooms] = useState([{ adults: 1, children: 0 }]);

  const handleCountIncrement = (index, field, value) => {
    const updatedRooms = [...rooms];
    if (updatedRooms[index]["adults"] + updatedRooms[index]["children"] < 4)
      if (
        (field === "adults" && updatedRooms[index][field] < 3) ||
        field === "children"
      )
        updatedRooms[index][field]++;
    setRooms(updatedRooms);
  };
  const handleCountDecrement = (index, field) => {
    const updatedRooms = [...rooms];
    if (field === "adults" && updatedRooms[index][field] == 1) return;
    if (field === "children" && updatedRooms[index][field] == 0) return;
    updatedRooms[index][field]--;
    setRooms(updatedRooms);
  };
  const handleAddRoom = () => {
    setRooms([...rooms, { adults: 1, children: 0 }]);
  };
  const handleRemoveRoom = (index) => {
    const updatedRooms = [...rooms];
    updatedRooms.splice(index, 1);
    setRooms(updatedRooms);
  };
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [startDate, setStartDate] = useState(currentDate);
  const [endDate, setEndDate] = useState(currentDate);
  const [dayCount, setDayCount] = useState(0);
  const handleDayCountIncrement = () => {
    if (dayCount === 15) return;
    setDayCount(dayCount + 1);
  };
  const handleDayCountDecrement = () => {
    if (dayCount === 0) return;
    setDayCount(dayCount - 1);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };
  let maxDate = new Date(startDate);
  maxDate.setDate(maxDate.getDate() + 15);
  const [maxEndDate, setMaxEndDate] = useState(
    maxDate.toISOString().split("T")[0],
  );
  useEffect(() => {
    maxDate = new Date(startDate);
    maxDate.setDate(maxDate.getDate() + 15);
    setMaxEndDate(maxDate.toISOString().split("T")[0]);
    const limitDate = new Date(startDate);
    limitDate.setDate(limitDate.getDate() + dayCount);
    const formattedLimitDate = limitDate.toISOString().split("T")[0];
    setEndDate(formattedLimitDate);
  }, [startDate]);
  useEffect(() => {
    const limitDate = new Date(startDate);
    limitDate.setDate(limitDate.getDate() + dayCount);
    const formattedLimitDate = limitDate.toISOString().split("T")[0];
    setEndDate(formattedLimitDate);
  }, [dayCount]);
  useEffect(() => {
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    days !== dayCount && days >= 0 ? setDayCount(days) : null;
  }, [endDate]);
  const handleDropdown = () => {
    dispSortBox === false ? document.querySelector(".sortingDropdown").style.display = "block" : document.querySelector(".sortingDropdown").style.display = "none";
    setDispSortBox(!dispSortBox);
  }
  useEffect(() => {
    // setCurrentPage(0);
    let s = "";
    if (statusList.length > 0)
      s += "?regions=" + statusList.join(",");
    else
      s += "?regions=" + items.join(",");
    if (amount > 0)
      s += "&amount=" + amount;
    else
      s += "&amount=1000000";
    if (dayCount > 0)
      s += "&days=" + dayCount;
    else
      s += "&days=15";
    s += "&Sort=" + sortOrder;
    s += "&pageNo=" + currentPage;
    s += "&pageSize=3"
    setFilter(s);
    fetchExperiences("http://localhost:8085/experiences/filtered" + s).then((experiences) => {
      setDetail(experiences.content);
      setPageCount(experiences.totalPages);
      setTotalExperiences(experiences.totalElements);
    });
  }, [statusList, amount, dayCount, items, sortOrder, currentPage])

  // const  isLiked = async (eid) => {
  //   if (isLoggedIn) {
  //     const res = await fetch('http://localhost:8085/likedExperiences/isLiked/' + eid + '/' + user.id, {
  //       method: 'GET'
  //     })
  //       .then(res => res.text())
  //       .then(data => { console.log(data); return data === "true" ? true : false });

  //       console.log(eid + " " + user.id+ " res=" + res);

  //     return res;
  //   }
  //   return false;
  // }
  return (
    <div>
      <div className="header w-full  overflow-hidden text-center h-screen  text-white font-bold">
        <video
          className="w-full"
          autoPlay
          loop
          muted
          style={{
            background: "linear-gradient(rgba(0,0,0,1), rgba(0,0,0,1))",
          }}
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="absolute h-screen w-full top-0 p-3 flex items-center justify-center  text-white"
          style={{
            background: "radial-gradient(rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.2) 60%)",
          }}
        >
          <h1 className="text-6xl">Book the Best Experiences in India</h1>
        </div>
      </div>

      <div className="flex gap-10 p-10 flex-row items-start"
      // style={{
      //   background: `linear-gradient(rgba(225, 225, 225, 1) 40%, rgba(0, 0, 0, 0.8) 60% ) , URL(${expbg})`,
      //   backgroundSize: 'cover',
      // }}
      >
        <div className="flex flex-col my-7 p-7 w-1/4 text-center rounded-lg justify-center top-8 sticky items-center shadow-lg border-solid border-gray-300 border-2"
        // style={{
        //   background: `linear-gradient(rgba(225, 225, 225, 1) 40%, rgba(225,225,225,0.8) 60% )`,
        // }}
        >
          <div className="text-center  text-red-800 font-bold text-2xl ">
            <h1 className="mr-4">Destinations</h1>
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
            {items.length > 0 && items.map((item, i) => (
              <div
                key={i}
                className="flex flex-row gap-2 bg-red-800 text-white p-1 text-xl border-white border-solid border-2 w-full"
              >
                <input
                  className="accent-red-200"
                  type="checkbox"
                  onChange={() => handleOnChange(item)}
                  checked={statusList.includes(item)}
                />
                <label key={i}>{item}</label>
              </div>
            ))}
          </div>

          <div className="text-center font-bold text-red-800 text-2xl">
            Budget
          </div>
          <input
            type="range"
            min="0"
            max="150000"
            step="100"
            className="accent-red-800 w-full"
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="text-red-800 ">{amount}</div>

          <div className="text-center font-bold text-red-800 text-2xl">
            Rooms&Guests
          </div>
          {rooms.map((room, index) => (
            <div
              key={index}
              className="flex flex-row gap-4 text-center bg-red-800 text-white p-1 text-md border-white border-solid border-2 w-full align-middle"
            >
              <div>Room {index + 1}</div>
              <div className="flex flex-col text-center">
                <div>Adults</div>
                <div className="flex flex-row gap-4 text-red-800 bg-white items-center">
                  <button
                    className=" font-bold p-1 rounded-md"
                    onClick={(e) => handleCountDecrement(index, "adults")}
                  >
                    -
                  </button>
                  {room.adults}
                  <button
                    className=" font-bold p-1 rounded-md"
                    onClick={() => handleCountIncrement(index, "adults")}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-col">
                <div>Children</div>
                <div className="flex flex-row gap-4 text-red-800 bg-white items-center">
                  <button
                    className=" font-bold p-1 rounded-md"
                    onClick={(e) => handleCountDecrement(index, "children")}
                  >
                    -
                  </button>
                  {room.children}
                  <button
                    className=" font-bold p-1 rounded-md"
                    onClick={() => handleCountIncrement(index, "children")}
                  >
                    +
                  </button>
                </div>
              </div>
              {index !== 0 ? (
                <button onClick={() => handleRemoveRoom(index)}>Remove</button>
              ) : (
                <button
                  className="text-grey-100"
                  disabled
                  onClick={() => handleRemoveRoom(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          {rooms.length <= 4 ? (
            <button
              className="border-solid border-red-800 border-2 p-1 text-red-800"
              onClick={handleAddRoom}
            >
              Add Room
            </button>
          ) : null}
          <div className="text-center font-bold text-red-800 text-2xl">
            Holiday Duration (Days)
          </div>
          <div className="flex flex-row  text-white font-bold text-md items-center justify-center gap-10 border-solid border-red-800 border-2 p-1 w-1/2 bg-red-800">
            <button
              className=" font-bold p-1 rounded-md text-xl"
              onClick={handleDayCountDecrement}
            >
              -
            </button>
            {dayCount}
            <button
              className=" font-bold p-1 rounded-md text-xl"
              onClick={handleDayCountIncrement}
            >
              +
            </button>
          </div>
          <div className="text-center font-bold text-red-800 text-2xl">
            Start Date
          </div>
          <input
            type="date"
            value={startDate}
            min={currentDate}
            className="text-md font-bold border-solid bg-red-800 border-red-800 border-2 p-2 w-auto accent-red-800 text-white"
            onChange={handleStartDateChange}
          />
          <div className="text-center font-bold text-red-800 text-2xl">
            End Date
          </div>
          <input
            type="date"
            value={endDate}
            min={startDate}
            max={maxEndDate}
            className="text-md font-bold bg-red-800 border-solid border-red-800 border-2 p-2 w-auto accent-red-800 text-white"
            onChange={handleEndDateChange}
          />
        </div>

        <div className="my-5 w-full flex flex-col items-center relative">
          <button className="border-solid w-1/2 mb-10 border-red-800 border-2 p-3 text-red-800" onClick={() => { setShowAddExperience(true) }}>Add Experience</button>
          <div className="absolute right-0 top-11  w-auto text-center">
            {/* <button onClick={() => { sortItem() }} ><IoIosFunnel className={sortOrder === "" ? "text-red-300 hover:text-red-500 text-4xl" : "text-red-800 hover:text-red-500 text-4xl"} /></button> */}
            {/* <p className="text-red-900">Sort Price Lowest to Highest</p> */}
            <div className="border-2 border-gray-800 border-solid p-3 rounded-2xl m-5  items-center flex ">
              <span className="text-lg font-bold mr-3">Sorted By: </span><span className="value mr-3">{sortOrder === "" ? "Not Sorted" : sortOrder.split(",").join(" ").replace("ASC", "Low to High").replace("DESC", "High to Low").replace("amount", "Price-").replace("days Low to High", "Duration-Short to Long").replace("days High to Low", "Duration-Long to Short")}</span>
              <span><button onClick={() => {
                handleDropdown();
              }} className="text-4xl">{!dispSortBox ? <RiArrowDropDownLine /> : <RiArrowDropUpFill />}</button></span>
            </div>
            <ul className="sortingDropdown bg-white text-left text-lg text-black shadow-lg hidden cursor-pointer">
              <li className="hover:bg-gray-200 p-2" onClick={() => { setSortOrder(""); handleDropdown() }}>Not Sorted</li>
              <li className="hover:bg-gray-200 p-2" onClick={() => { setSortOrder("amount,ASC"); handleDropdown() }}>Price-Low to High</li>
              <li className="hover:bg-gray-200 p-2" onClick={() => { setSortOrder("amount,DESC"); handleDropdown() }}>Price-High to Low</li>
              <li className="hover:bg-gray-200 p-2" onClick={() => { setSortOrder("days,ASC"); handleDropdown() }}>Duration-Short to Long</li>
              <li className="hover:bg-gray-200 p-2" onClick={() => { setSortOrder("days,DESC"); handleDropdown() }}>Duration-Long to Short</li>
            </ul>
          </div>
          {/* <h3 className="align-left">Total '{totalExperiences}' Experiences</h3> */}
          {detail && detail.map((item, i) =>
          // liked={isLiked(item.experienceId) ? true : false}
            <ExperienceCard key={item.experienceId}  details={item} handleDeleteExperience={handleDeleteExperience} handleUpdateExperience={handleUpdateExperience} />
          )}
          <Pagination pageCount={pageCount} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
      </div>
      {showAddExperience ? (
        <div className="fixed top-0 left-0 z-40 w-full h-screen bg-black bg-opacity-50 flex justify-center items-center ">
          <div className="w-2/3 bg-white p-5 h-screen overflow-scroll relative ">
            <button onClick={() => resetData()}><IoIosClose className="text-red-800 text-6xl absolute right-5 top-5" /></button>
            <div className="font-bold text-2xl text-center text-red-800">
              {updateExperience ? " Update Experience" : "Add Experience"}
            </div>
            <label htmlFor="">Title</label>
            <div className="flex flex-col gap-5">
              <input
                type="text"
                placeholder="Enter Title"
                onChange={(e) => setAddTitle(e.target.value)}
                value={addTitle}
                className="border-solid border-red-800 border-2 p-3"
              />
              <label htmlFor="">Description</label>
              <textarea
                ref={(el) => { el && el.setAttribute("style", "height:" + el.scrollHeight + "px"); }}
                type="text"
                placeholder="Description"
                onChange={(e) => setAddDescription(e.target.value)}
                value={addDescription}
                className="border-solid border-red-800 border-2 p-3 h-fit"
              />
              <label htmlFor="">Location</label>

              <input
                type="text"
                placeholder="Location URL"
                onChange={(e) => setAddLocation(e.target.value)}
                value={addLocation}
                className="border-solid border-red-800 border-2 p-3"
              />
              {addLocation && <iframe height="500" src={addLocation} ></iframe>}
              {/* <input
                type="text"
                placeholder="Image URL"
                onChange={(e) => setAddImage(e.target.value)}
                value={addImage}

                className="border-solid border-red-800 border-2 p-3"
              /> */}
              <label >Uplaod Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => { setAddImage(e.target.files[0]) }}
                className="border-solid border-red-800 border-2 p-3"
              />
              {addImage !== "" && addImage.size > 0 && <img src={URL.createObjectURL(addImage)} alt="preview Image" />}

              <label htmlFor="">Region</label>
              <input
                type="text"
                placeholder="Region"
                onChange={(e) => setAddRegion(e.target.value)}
                value={addRegion}
                className="border-solid border-red-800 border-2 p-3"
              />
              <label htmlFor="">Price</label>
              <input
                type="number"
                placeholder="Amount"
                onChange={(e) => setAddAmount(e.target.value)}
                value={addAmount}
                className="border-solid border-red-800 border-2 p-3"
              />
              <label htmlFor="">Days</label>
              <input
                type="number"
                placeholder="Days"
                onChange={(e) => setAddDays(e.target.value)}
                value={addDays}
                className="border-solid border-red-800 border-2 p-3"
              />

              {updateExperience ? <button
                className="border-solid border-red-800 border-2 p-3 text-red-800"
                onClick={() => postUpdatedExperience()}
              >
                Update
              </button> :
                <button
                  className="border-solid border-red-800 border-2 p-3 text-red-800"
                  onClick={() => handleAddExperience()}
                >
                  Add
                </button>}
              <button className=" p-3 text-red-800" onClick={() => { resetData() }}>Close</button>
            </div>

          </div>
        </div>
      ) : null}
      {/* {   showAlert && <AlertBox message={alertMessage} setAlertResponse={setAlertResponse} setShowAlert={setShowAlert} /> } */}
    </div>
  );
};

export default Experiences;
