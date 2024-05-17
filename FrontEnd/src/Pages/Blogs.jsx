import Card from "./Card.jsx";
import { useState, useEffect } from "react";
//import img1 from "./img/blogimage1.jpg";
//import img2 from "./img/blogimage2.jpg";
import img3 from "../assets/blogimage3.jpg";
import "./Blogs.css";
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
    <div className="app-container bg-white">
      <div
        className="background-container"
        style={{ backgroundImage: `url(${img3})` }}
      >
        <div className="overlay">
          <div className="max-width-1 m-auto">
            <h1 className="text-center text-white">Welcome to Our Blog</h1>
          </div>
        </div>
      </div>
      <div className="max-width-1 m-auto">
        <div>
          <hr />
        </div>
      </div>
      <div className="evenlisting-container max-width-1 m-auto my-4">
        <div className="evenlisting-item">All</div>
        <div className="evenlisting-item">Latest</div>
        <div className="evenlisting-item">Guest Post</div>
      </div>
      <div>
        <div>
          <button
            onClick={() => {
              setShowAddBlog(true);
            }}
          >
            Add Blogs
          </button>
        </div>
      </div>
      <div className=" flex flex-col home-articles max-width-1 m-auto">
        <div>
          <h2>Featured Articles</h2>
        </div>
        {articles.map((article, index) => (
          <div key={index}>
            <div>
              <Card details={article} />
            </div>
            <div>
              <button className="read-more-button">Read More</button>
            </div>
          </div>
        ))}
      </div>
      {showAddBlog ? (
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="w-1/3 bg-white p-5">
            <div className="font-bold text-2xl text-center text-red-800">
              Add a Blog
            </div>
            <div className="flex flex-col gap-5">
              <div>
                <input
                  type="text"
                  placeholder="Enter Title"
                  onChange={(e) => setAddTitle(e.target.value)}
                  value={addTitle}
                  className="border-solid border-red-800 border-2 p-3"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Text"
                  onChange={(e) => setAddText(e.target.value)}
                  value={addText}
                  className="border-solid border-red-800 border-2 p-3"
                />
              </div>
              <div>
                <input
                  type="date"
                  placeholder="Date"
                  onChange={(e) => setAddDate(e.target.value)}
                  value={addDate}
                  className="border-solid border-red-800 border-2 p-3"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Image URL"
                  onChange={(e) => setAddImage(e.target.value)}
                  value={addImage}
                  className="border-solid border-red-800 border-2 p-3"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Author"
                  onChange={(e) => setAddAuthor(e.target.value)}
                  value={addAuthor}
                  className="border-solid border-red-800 border-2 p-3"
                />
              </div>
              <div>
                <button
                  className="border-solid border-red-800 border-2 p-3 text-red-800"
                  onClick={() => handleAddBlog()}
                >
                  Add
                </button>
              </div>
              <div>
                <button
                  className="p-3 text-red-800"
                  onClick={() => {
                    resetData();
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Blog;
