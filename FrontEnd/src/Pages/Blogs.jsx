import Card from "./Card.jsx";
import { useState, useEffect } from "react";
import img3 from "../assets/blogimage3.jpg";
const baseUrl = "http://13.60.74.234:8085/permit/";

const fetchBlogs = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${baseUrl}doc/`);
      const data = await response.json();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

const Blog = () => {
  const [addTitle, setAddTitle] = useState("");
  const [addText, setAddText] = useState("");
  const [addDate, setAddDate] = useState("");
  const [addImage, setAddImage] = useState("");
  const [addAuthor, setAddAuthor] = useState("");
  const [articles, setArticles] = useState([]);
  const [showAddBlog, setShowAddBlog] = useState(false);

  const resetData = () => {
    setAddTitle("");
    setAddText("");
    setAddDate("");
    setAddImage("");
    setAddAuthor("");
    setShowAddBlog(false);
  };

  const handleAddBlog = () => {
    if (confirm("Are you sure you want to add this blog?") === true) {
      fetch(`${baseUrl}doc/`, {
        method: "POST",
        body: JSON.stringify({
          title: addTitle,
          body: addText,
          image: addImage,
          author: addAuthor,
          date: addDate.toString(),
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          fetchBlogs().then((blogs) => {
            setArticles(blogs.data);
          });
          resetData();
        });
    }
  };

  useEffect(() => {
    fetchBlogs().then((blogs) => {
      setArticles(blogs.data);
    });
  }, []);

  return (
    <div className="bg-white">
      <div
        className="mt-40 relative bg-cover bg-center py-12 text-white"
        style={{ backgroundImage: `url(${img3})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <h1 className="text-3xl">Welcome to Our Blog</h1>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto my-4">
        <hr />
        <div className="flex justify-around my-4">
          <div className="cursor-pointer">All</div>
          <div className="cursor-pointer">Latest</div>
          <div className="cursor-pointer">Guest Post</div>
        </div>
        <div className="text-center mb-4">
          <button
            className="bg-red-700 text-white py-2 px-4 rounded hover:bg-red-800"
            onClick={() => setShowAddBlog(true)}
          >
            Add Blogs
          </button>
        </div>
        <div className="px-4 py-4 bg-white  mt-6 relative">
          <h2 className="text-2xl mb-4 text-center text-gray-900">
            Featured Articles
          </h2>
          <div className="flex flex-col gap-6">
            {articles.map((article, index) => (
              <div key={index} className="bg-white p-4 shadow-xl rounded-lg">
                <Card details={article} />
                <button className="mt-4 bg-brown-600 text-white py-2 px-4 rounded hover:bg-brown-700">
                  Read More
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showAddBlog && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded w-11/12 md:w-1/3">
            <h2 className="font-bold text-2xl text-center text-red-800">
              Add a Blog
            </h2>
            <div className="flex flex-col gap-5">
              <input
                type="text"
                placeholder="Enter Title"
                value={addTitle}
                onChange={(e) => setAddTitle(e.target.value)}
                className="border border-red-800 p-3 rounded focus:outline-none focus:border-red-600"
              />
              <input
                type="text"
                placeholder="Text"
                value={addText}
                onChange={(e) => setAddText(e.target.value)}
                className="border border-red-800 p-3 rounded focus:outline-none focus:border-red-600"
              />
              <input
                type="date"
                value={addDate}
                onChange={(e) => setAddDate(e.target.value)}
                className="border border-red-800 p-3 rounded focus:outline-none focus:border-red-600"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={addImage}
                onChange={(e) => setAddImage(e.target.value)}
                className="border border-red-800 p-3 rounded focus:outline-none focus:border-red-600"
              />
              <input
                type="text"
                placeholder="Author"
                value={addAuthor}
                onChange={(e) => setAddAuthor(e.target.value)}
                className="border border-red-800 p-3 rounded focus:outline-none focus:border-red-600"
              />
              <button
                className="bg-red-800 text-white p-3 rounded hover:bg-red-900"
                onClick={handleAddBlog}
              >
                Add
              </button>
              <button className="p-3 text-red-800" onClick={resetData}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
