import React, { useContext, useEffect, useState } from 'react';
import Block from '../components/block';
import { FaFacebook, FaSnapchat, FaTwitter, FaLinkedin } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { IsLoggedInContext } from '../App';
import { useNavigate } from 'react-router-dom';

const fetchDetails = async (url) => {

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

function ContactUs() {
  const baseUrl = "http://13.60.74.234:8085/permit";
  const { user, isLoggedIn } = useContext(IsLoggedInContext);
  const [data, setData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const navigate = useNavigate();

  const showTickets = async () => {
    if (isLoggedIn) {
      try {
        const data = await fetchDetails(`${baseUrl}/contactus/get?userId=` + user.id);
        setData(data);
        setShowTable(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    else {
      if (confirm("Please login to see tickets") === true) {
        navigate('/login')
        window.scrollTo(0, 0);
      }
    }
  }

  useEffect(() => {
    console.log(data);
  }, [data]);

  // Define states for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [mobile, setMobile] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [country, setCountry] = useState('');
  const [query, setQuery] = useState('');

  const reset = () => {
    setName('');
    setEmail('');
    setCity('');
    setMobile('');
    setWhatsapp('');
    setCountry('');
    setQuery('');
  }

  const handleOnSubmit = async () => {
    if(isLoggedIn)
      {
    try {
      console.log(user.id);
      const response = await fetch(`${baseUrl}/contactus/create?userId=` + user.id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          city: city,
          mobile: mobile,
          whatsApp: whatsapp,
          country: country,
          query: query,
        }),
      });
      const data = await response.json();
      console.log('Success:', data);
      alert('Form submitted successfully');
      reset();
    } catch (error) {
      console.error('Error:', error);
      alert('Error in submitting form');
    }
  }
  else {
    if (confirm("Please Login to raise a query") === true) {
        navigate('/login')
        window.scrollTo(0, 0);
    }
}
  }

  return (
    <>
      <Block />
      <br />
      <br />

      <center>
        <h1 className="text-red-800 font-bold text-3xl tracking-widest">CONTACT US </h1>
      </center>
      <br />
      <br />
      <form onSubmit={(e) => { e.preventDefault(); handleOnSubmit(); }}>
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
        {/* <div className="flex flex-wrap ">
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
          </div> */}
        {/* <div className="relative flex-grow max-w-full flex-1 px-4"></div>
        </div> */}
        {/* <div className="flex flex-wrap ">
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
          </div> */}
        {/* <div className="relative flex-grow max-w-full flex-1 px-4"></div>
        </div>
        <div className="flex flex-wrap ">
          <div className="relative flex-grow max-w-full flex-1 px-4"></div>
          <div className="sm:w-2/3 pr-4 pl-4">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Whatsapp Number
            </label>
            <input
              type="text"
              className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
              id="exampleFormControlInput1"
              placeholder="Enter Your Whatsapp number"
              onChange={e => setWhatsapp(e.target.value)}
              value={whatsapp}
            />
          </div> */}
        {/* <div className="relative flex-grow max-w-full flex-1 px-4"></div>
        </div> */}
        {/* <div className="flex flex-wrap ">
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
        </div> */}
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
                onChange={e => setQuery(e.target.value)}
                value={query}
              />
            </div>
          </div>
          <div className="relative flex-grow max-w-full flex-1 px-4"></div>
        </div>
        <div className="flex flex-wrap ">
          <div className="relative flex-grow max-w-full flex-1 px-4"></div>
          <div className="relative flex-grow max-w-full flex-1 px-4 container mx-auto sm:px-4 mx-auto sm:px-4 text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={showTickets}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4"
            >
              Show Tickets
            </button>
          </div>
          <div className="relative flex-grow max-w-full flex-1 px-4"></div>
        </div>
      </form>

      <br />
      <br />

      {showTable && (
        <div className="container mx-auto sm:px-4 mx-auto sm:px-4 text-center">
          <table className="min-w-full divide-y divide-gray-200 border border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th> */}
                {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th> */}
                {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th> */}
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Query</th>
                {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">WhatsApp</th> */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data && data.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-left">{item.name}</td>
                  <td className="px-6 py-4 text-left">{item.email}</td>
                  {/* <td className="px-6 py-4 text-left">{item.city}</td> */}
                  {/* <td className="px-6 py-4 text-left">{item.mobile}</td> */}
                  {/* <td className="px-6 py-4 text-left">{item.country}</td> */}
                  <td className="px-6 py-4 text-left">{item.query}</td>
                  {/* <td className="px-6 py-4 text-left">{item.whatsApp}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default ContactUs;