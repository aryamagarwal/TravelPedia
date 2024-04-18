import React from 'react'

function ContactUs() {
  return (
    // <div>
    //   This page is under construction
      
    // </div>
    <>
  {/* navbar */}
  <br />
  <br />
  <center>
    <h1 class="text-red-800 font-bold text-3xl">CONTACT US </h1>
  </center>
  <br />
  <br />
  <form>
    <div className="flex flex-wrap ">
      <div className="relative flex-grow max-w-full flex-1 px-4"></div>
      <div className="sm:w-2/3 pr-4 pl-4">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
          id="exampleFormControlInput1"
          placeholder="Enter Your name"
        />
      </div>
      <div className="relative flex-grow max-w-full flex-1 px-4"></div>
    </div>
    <div className="flex flex-wrap ">
      <div className="relative flex-grow max-w-full flex-1 px-4"></div>
      <div className="sm:w-2/3 pr-4 pl-4">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
        />
      </div>
      <div className="relative flex-grow max-w-full flex-1 px-4"></div>
    </div>
    <div className="flex flex-wrap ">
      <div className="relative flex-grow max-w-full flex-1 px-4"></div>
      <div className="sm:w-2/3 pr-4 pl-4">
        <label htmlFor="exampleDataList" className="form-label">
          Enter your City
        </label>
        <input
          className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
          list="datalistOptions"
          id="exampleDataList"
          placeholder="Type to search..."
        />
        <datalist id="datalistOptions">
          <option value="Lucknow"></option>
          <option value="Kanpur"></option>
          <option value="Bombay"></option>
          <option value="Pune"></option>
          <option value="Bhopal"></option>
          <option value="Kolkata"></option>
          <option value="Chennai"></option>
          <option value="Agra"></option>
        </datalist>
      </div>
      <div className="relative flex-grow max-w-full flex-1 px-4"></div>
    </div>
    <div className="flex flex-wrap ">
      <div className="relative flex-grow max-w-full flex-1 px-4"></div>
      <div className="sm:w-2/3 pr-4 pl-4">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Mobile Number
        </label>
        <input
          type="text"
          className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
          id="exampleFormControlInput1"
          placeholder="Enter Your Mobile number"
        />
      </div>
      <div className="relative flex-grow max-w-full flex-1 px-4"></div>
    </div>
    <div className="flex flex-wrap ">
      <div className="relative flex-grow max-w-full flex-1 px-4"></div>
      <div className="sm:w-2/3 pr-4 pl-4">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Whatsapp Number
        </label>
        <input
          type="email"
          className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
          id="exampleFormControlInput1"
          placeholder="Enter Your Whatsapp number"
        />
      </div>
      <div className="relative flex-grow max-w-full flex-1 px-4"></div>
    </div>
    <div className="flex flex-wrap ">
      <div className="relative flex-grow max-w-full flex-1 px-4"></div>
      <div className="sm:w-2/3 pr-4 pl-4">
        <label htmlFor="exampleDataList" className="form-label">
          Enter your Country
        </label>
        <input
          className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
          list="datalistOptions."
          id="exampleDataList"
          placeholder="Type to search..."
        />
        <datalist id="datalistOptions.">
          <option value="India"></option>
          <option value="America"></option>
          <option value="Australia"></option>
          <option value="Canada"></option>
          <option value="Iran"></option>
          <option value="Palestine"></option>
          <option value="Sri Lanka"></option>
          <option value="China"></option>
        </datalist>
      </div>
      <div className="relative flex-grow max-w-full flex-1 px-4"></div>
    </div>
    <div className="flex flex-wrap ">
      <div className="relative flex-grow max-w-full flex-1 px-4"></div>
      <div className="sm:w-2/3 pr-4 pl-4">
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            ENTER YOUR QUERY
          </label>
          <textarea
            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
            id="exampleFormControlTextarea1"
            rows={3}
            defaultValue={""}
          />
        </div>
      </div>
      <div className="relative flex-grow max-w-full flex-1 px-4"></div>
    </div>
    <div className="flex flex-wrap ">
      <div className="relative flex-grow max-w-full flex-1 px-4"></div>
      <div className="relative flex-grow max-w-full flex-1 px-4 container mx-auto sm:px-4 mx-auto sm:px-4 text-center">
        <button type="button" className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-red-800 text-white hover:bg-gray-800">
          SUBMIT
        </button>
      </div>
      <div className="relative flex-grow max-w-full flex-1 px-4"></div>
    </div>
    <br />
    <br />
    <br />
    <br />
    <div className="flex justify-center items-center ">
      <div className="relative flex-grow max-w-full flex-1 px-4 container mx-auto sm:px-4 mx-auto sm:px-4 text-center">
        <i className="bi bi-snapchat m-12 pb-5 " style={{ fontSize: 30 }} />
        <p className="">______________</p>
        <span>SNAPCHAT</span>
      </div>
      <div className="relative flex-grow max-w-full flex-1 px-4 container mx-auto sm:px-4 mx-auto sm:px-4 text-center">
        <i className="bi bi-twitter m-12 pb-5" style={{ fontSize: 30 }} />
        <p className="">______________</p>
        <span>TWITTER</span>
      </div>
      <div className="relative flex-grow max-w-full flex-1 px-4 container mx-auto sm:px-4 mx-auto sm:px-4 text-center">
        <i className="bi bi-facebook m-12 pb-5" style={{ fontSize: 30 }} />
        <p className="">______________</p>
        <span>FACEBOOK</span>
      </div>
      <div className="relative flex-grow max-w-full flex-1 px-4 container mx-auto sm:px-4 mx-auto sm:px-4 text-center">
        <i className="bi bi-linkedin m-12 pb-5" style={{ fontSize: 30 }} />
        <p className="">______________</p>
        <span>LINKEDIN</span>
      </div>
      <div className="relative flex-grow max-w-full flex-1 px-4 container mx-auto sm:px-4 mx-auto sm:px-4 text-center">
        <i className="bi bi-telephone-fill m-12 pb-5" style={{ fontSize: 30 }} />
        <p className="">______________</p>
        <span>TELEPHONE</span>
      </div>
    </div>
    <br />
  </form>
</>
  )
}

export default ContactUs
