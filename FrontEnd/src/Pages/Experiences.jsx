import React, { useEffect, useState } from "react";
import Block from "../components/block";
import trial from "../assets/slide1.jpg";
import ExperienceCard from "../components/ExperienceCard";
import bgVideo from "../assets/video/video_bg.mp4";
import useFetch from "../components/useFetch.jsx";
import { IoIosFunnel } from "react-icons/io";
import Pagination from "../components/Pagination.jsx";
import expbg from "../assets/expbg.webp"
// import Searchbar from "../components/Searchbar.jsx";
import { IoIosClose } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpFill } from "react-icons/ri";
import { IsLoggedInContext } from "../App.jsx";
import { useContext } from "react";
// import AlertBox from "../components/AlertBox.jsx";
import { MdDelete } from "react-icons/md";
import { IoIosRemoveCircle } from "react-icons/io";
import Loading from "../components/Loading.jsx";
import FilterMenu from "../components/FilterMenu.jsx";
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
  const baseUrl = "http://localhost:8085/";
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
  const [clearFilters, setClearFilters] = React.useState(false)
  const [totalPeople, setTotalPeople] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [filterMenu, setFilterMenu] = React.useState(false);
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
    fetch(baseUrl + "experiences/experienceImage/" + details.title)
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
    else {
      try {
        const response = await fetch(baseUrl + "experiences/update/" + currentExperienceId, {
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
            const message = await fetch(baseUrl + "experiences/file-upload", {
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
          fetchExperiences(baseUrl + "experiences/regions").then((destinations) => {
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

    fetchExperiences(baseUrl + "experiences/regions").then((regions) => {
      setItems(regions);
    });


  }, [])



  const handleAddExperience = async () => {
    if (confirm("Are you sure you want to add this experience?") === false) return;
    // setShowAlert(true);
    // setAlertMessage("Are you sure you want to add this experience?");
    // if(alertResponse === false) return;
    try {
      const response = await fetch(baseUrl + "experiences/create", {
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
          const message = await fetch(baseUrl + "experiences/file-upload", {
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
        fetchExperiences(baseUrl + "experiences/regions").then((destinations) => {
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
        fetchExperiences(baseUrl + "experiences/regions").then((destinations) => {
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
    if (clearFilters) {
      setAmount(0);
      setDayCount(0);
      setStartDate(currentDate);
      setEndDate(currentDate);
      setStatusList([]);
      setClearFilters(false)
    }
  }, [clearFilters])
  useEffect(() => {
    // setCurrentPage(0);
    setLoading(true);
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
    s += "&pageSize=5"
    setFilter(s);
    fetchExperiences(baseUrl + "experiences/filtered" + s).then((experiences) => {
      setDetail(experiences.content);
      setPageCount(experiences.totalPages);
      setTotalExperiences(experiences.totalElements);
      setLoading(false);
    });
  }, [statusList, amount, dayCount, items, sortOrder, currentPage])

  useEffect(() => {
    let count = 0;
    rooms.map((rooms) => {
      count += parseInt(rooms.adults) + parseInt(rooms.children);
    })
    setTotalPeople(count);
  }, [rooms])

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
      <div className="header w-full relative overflow-hidden text-center h-screen/3 md:h-screen/2 xl:h-screen  text-white font-bold">
        <video
          className="w-full"
          autoPlay
          loop
          muted
          style={{
            background: "linear-gradient(rgba(0,0,0,1), rgba(0,0,0,1))",
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="absolute xl:h-screen w-full top-1/2 -translate-y-1/2 p-3 flex items-center justify-center  text-white"
          style={{
            background: "radial-gradient(rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.2) 60%)",

          }}
        >
          <h1 className="text-center text-3xl xl:text-6xl">Book the Best Experiences in India</h1>
        </div>
      </div>
      <div className="flex gap-10 p-10 flex-row items-start"
      // style={{
      //   background: `linear-gradient(rgba(225, 225, 225, 1) 40%, rgba(0, 0, 0, 0.8) 60% ) , URL(${expbg})`,
      //   backgroundSize: 'cover',
      // }}
      >
      <FilterMenu items={items} amount={amount} setAmount={setAmount} rooms={rooms} handleAddRoom={handleAddRoom} handleDayCountDecrement={handleDayCountDecrement} handleDayCountIncrement={handleDayCountIncrement} dayCount={dayCount}
      startDate={startDate} currentDate={currentDate} handleStartDateChange={handleStartDateChange} endDate={endDate} handleEndDateChange={handleEndDateChange} maxEndDate={maxEndDate} statusList={statusList}
      handleOnChange={handleOnChange} handleCountDecrement={handleCountDecrement} handleCountIncrement={handleCountIncrement} handleRemoveRoom={handleRemoveRoom} setClearFilters={setClearFilters} filterMenu={false}/>
        
        <div className="my-5 w-full flex flex-col items-center relative">
          <button className="border-solid w-1/2 mb-3 md:mb-10 border-red-800 border-2 p-3 text-red-800" onClick={() => { setShowAddExperience(true) }}>Add Experience</button>
          <div className="w-full justify-between flex items-center">
            <div className="block xl:hidden left-0 top-1">
              <button onClick={() => { setFilterMenu(true) }} className="border-solid border-black border-2 p-4 rounded-xl font-bold">Filters</button>
            </div>
            {filterMenu===true && <FilterMenu items={items} amount={amount} setAmount={setAmount} rooms={rooms} handleAddRoom={handleAddRoom} handleDayCountDecrement={handleDayCountDecrement} handleDayCountIncrement={handleDayCountIncrement} dayCount={dayCount}
              startDate={startDate} currentDate={currentDate} handleStartDateChange={handleStartDateChange} endDate={endDate} handleEndDateChange={handleEndDateChange} maxEndDate={maxEndDate} statusList={statusList}
              handleOnChange={handleOnChange} handleCountDecrement={handleCountDecrement} handleCountIncrement={handleCountIncrement} handleRemoveRoom={handleRemoveRoom} setClearFilters={setClearFilters} filterMenu={true} setFilterMenu={setFilterMenu}/>}
            <div className="relative whitespace-nowrap w-fit lg:w-90 text-center z-30">
              {/* <button onClick={() => { sortItem() }} ><IoIosFunnel className={sortOrder === "" ? "text-red-300 hover:text-red-500 text-4xl" : "text-red-800 hover:text-red-500 text-4xl"} /></button> */}
              {/* <p className="text-red-900">Sort Price Lowest to Highest</p> */}

              <div className="border-2 border-gray-800 border-solid p-1 lg:p-3 rounded-2xl m-5  items-center flex flex-col lg:flex-row ">
                <span className="text-sm lg:text-lg font-bold mr-3 whitespace-nowrap">Sorted By: </span>
                <div className="flex items-center w-auto">
                  <span className="value text-xs">{sortOrder === "" ? "Not Sorted" : sortOrder.split(",").join(" ").replace("ASC", "Low to High").replace("DESC", "High to Low").replace("amount", "Price-").replace("days Low to High", "Duration-Short to Long").replace("days High to Low", "Duration-Long to Short")}</span>
                  <span><button onClick={() => {
                    handleDropdown()
                  }} className="text-xl lg:text-4xl">{!dispSortBox ? <RiArrowDropDownLine /> : <RiArrowDropUpFill />}</button></span>
                </div>
              </div>
              <ul className=" absolute left-5 sortingDropdown bg-white text-left text-sm md:text-lg text-black shadow-lg hidden cursor-pointer">
                <li className="hover:bg-gray-200 p-2" onClick={() => { setSortOrder(""); handleDropdown() }}>Not Sorted</li>
                <li className="hover:bg-gray-200 p-2" onClick={() => { setSortOrder("amount,ASC"); handleDropdown() }}>Price-Low to High</li>
                <li className="hover:bg-gray-200 p-2" onClick={() => { setSortOrder("amount,DESC"); handleDropdown() }}>Price-High to Low</li>
                <li className="hover:bg-gray-200 p-2" onClick={() => { setSortOrder("days,ASC"); handleDropdown() }}>Duration-Short to Long</li>
                <li className="hover:bg-gray-200 p-2" onClick={() => { setSortOrder("days,DESC"); handleDropdown() }}>Duration-Long to Short</li>
              </ul>
            </div>
          </div>
          {loading && <Loading />}


          {/* <h3 className="align-left">Total '{totalExperiences}' Experiences</h3> */}
          {!loading && detail && detail.map((item, i) =>
            // liked={isLiked(item.experienceId) ? true : false}
            <ExperienceCard key={item.experienceId} totalPeople={totalPeople} details={item} handleDeleteExperience={handleDeleteExperience} handleUpdateExperience={handleUpdateExperience} />
          )}
          {!loading && pageCount===0 && <h1 className="text-4xl text-black">No Experiences Found</h1>}
         {!loading && pageCount!==0  && <Pagination pageCount={pageCount} currentPage={currentPage} setCurrentPage={setCurrentPage} /> }
        </div>
      </div>

      {showAddExperience ? (
        <div className="fixed top-0 left-0 z-40 w-full h-screen bg-black bg-opacity-50 flex justify-center items-center ">
          <form className="lg:w-2/3 w-full bg-white p-5 h-screen overflow-scroll relative ">
            <button onClick={() => resetData()}><IoIosClose className="text-red-800 text-6xl absolute right-5 top-5" /></button>
            <div className="font-bold text-2xl text-center text-red-800">
              {updateExperience ? " Update Experience" : "Add Experience"}
            </div>
            <label htmlFor="">Title</label>
            <div className="flex flex-col gap-5">
              <input
                type="text"
                required={true}
                placeholder="Enter Title"
                onChange={(e) => setAddTitle(e.target.value)}
                value={addTitle}
                className="border-solid border-red-800 border-2 p-3"
              />
              <label htmlFor="">Description</label>
              <textarea
                ref={(el) => { el && el.setAttribute("style", "height:" + el.scrollHeight + "px"); }}
                type="text"
                required={true}
                placeholder="Description"
                onChange={(e) => setAddDescription(e.target.value)}
                value={addDescription}
                className="border-solid border-red-800 border-2 p-3 h-fit"
              />
              <label htmlFor="">Location</label>

              <input
                type="text"
                placeholder="Location URL"
                required={true}
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
                required={true}
                onChange={(e) => setAddRegion(e.target.value)}
                value={addRegion}
                className="border-solid border-red-800 border-2 p-3"
              />
              <label htmlFor="">Price</label>
              <input
                type="number"
                placeholder="Amount"
                required={true}
                onChange={(e) => setAddAmount(e.target.value)}
                value={addAmount}
                className="border-solid border-red-800 border-2 p-3"
              />
              <label htmlFor="">Days</label>
              <input
                type="number"
                placeholder="Days"
                required={true}
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

          </form>
        </div>
      ) : null}
      {/* {   showAlert && <AlertBox message={alertMessage} setAlertResponse={setAlertResponse} setShowAlert={setShowAlert} /> } */}
    </div>
  );
};

export default Experiences;
