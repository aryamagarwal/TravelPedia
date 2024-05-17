import React from 'react'
import Block from '../components/block'
import { FaFacebook } from "react-icons/fa";
import { FaSnapchat } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { useState } from 'react';
function ContactUs() {

  //define states for form fields
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [mobile, setMobile] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [country, setCountry] = useState('')
  const [query, setQuery] = useState('')
   const reset = ()=>{
    setName('')
    setEmail('')
    setCity('')
    setMobile('')
    setWhatsapp('')
    setCountry('')
    setQuery('')
   }
  const handleOnSubmit = () => {
    fetch('http://localhost:8085/contactus/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        city: city,
        mobile: mobile,
        whatsApp: whatsapp,
        country: country,
        query: query
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        alert('Form submitted successfully')
        reset();
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error in submitting form')
      });
    }

  return (
    
    <>
      {/* navbar */}
      <Block></Block>
      <br />
      <br />
      <center>
        <h1 class="text-red-800 font-bold text-3xl tracking-widest">CONTACT US </h1>
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
              onChange={e => setName(e.target.value)}
              value={name}
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
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="relative flex-grow max-w-full flex-1 px-4"></div>
        </div>
        <div className="flex flex-wrap ">
          <div className="relative flex-grow max-w-full flex-1 px-4"></div>
          <div className="sm:w-2/3 pr-4 pl-4">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              City
            </label>
            <input
              type="text"
              className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
              id="exampleFormControlInput1"
              placeholder="Enter Your City"
              onChange={e => setCity(e.target.value)}
              value={city}
            />
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
              onChange={e => setMobile(e.target.value)}
              value={mobile}

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
              onChange={e => setWhatsapp(e.target.value)}
              value={whatsapp}
            />
          </div>
          <div className="relative flex-grow max-w-full flex-1 px-4"></div>
        </div>
        <div className="flex flex-wrap ">
          <div className="relative flex-grow max-w-full flex-1 px-4"></div>
          <div className="sm:w-2/3 pr-4 pl-4">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Country
            </label>
            <input
              type="text"
              className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
              id="exampleFormControlInput1"
              placeholder="Enter Your Country"
              onChange={e => setCountry(e.target.value)}
              value={country}
            />
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
                onChange={e => setQuery(e.target.value)}
                value={query}
              />
            </div>
          </div>
          <div className="relative flex-grow max-w-full flex-1 px-4"></div>
        </div>
        <div className="flex flex-wrap ">
          <div className="relative flex-grow max-w-full flex-1 px-4"></div>
          <div className="relative flex-grow max-w-full flex-1 px-4 container  mx-auto sm:px-4 text-center">
            <button onClick={()=>{handleOnSubmit()}} type="button" className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-red-800 text-white hover:bg-gray-800">
              SUBMIT
            </button>
          </div>

          <div className="relative flex-grow max-w-full flex-1 px-4"></div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <div className="flex justify-center items-center text-red-800 ">
          <div className="relative flex-grow max-w-full flex-1 px-4 container  mx-auto sm:px-4 text-center">
            <a href="https://snapchat.com" target="_blank" rel="noopener" className="mb-4 flex justify-center items-center">
              <FaSnapchat style={{ fontSize: 30 }} />
            </a>
            <p className="mb-1"></p>
            <span>SNAPCHAT</span>
          </div>
          <div className="relative flex-grow max-w-full flex-1 px-4 container mx-auto sm:px-4 text-center">
            <a href="https://twitter.com" target="_blank" rel="noopener" className="mb-4 flex justify-center items-center">
              { <FaTwitter style={{ fontSize: 30 }} /> }
            </a>
            <p className="mb-1"></p>
            <span>TWITTER</span>
          </div>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="relative flex-grow max-w-full flex-1 px-4 container  mx-auto sm:px-4 text-center">
            <div className="mb-4 flex justify-center items-center">
              <FaFacebook style={{ fontSize: 30 }} />
            </div>
            <p className="mb-1"></p>
            <span>FACEBOOK</span>
          </a>
          <div className="relative flex-grow max-w-full flex-1 px-4 container mx-auto sm:px-4 text-center">
            <a href="https://linkedin.com" target="_blank" rel="noopener" className="mb-4 flex justify-center items-center">
              <FaLinkedin style={{ fontSize: 30 }} />
            </a>
            <p className="mb-1"></p>
            <span>LINKEDIN</span>
          </div>
          <div className="relative flex-grow max-w-full flex-1 px-4 container mx-auto sm:px-4 text-center">
            <div className="mb-4 flex justify-center items-center">
              { <IoIosCall style={{ fontSize: 30 }} /> }
            </div>
            <p className="mb-1"></p>
            <span>TELEPHONE</span>
          </div>
        </div>
        <br />
      </form>
    </>
  )
}

export default ContactUs