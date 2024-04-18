import Card from "./Card.jsx";
import { useState } from "react";
import { useEffect } from "react";
// import img1 from "./img/blogimage1.jpg";
// import img2 from "./img/blogimage2.jpg";
import img3 from "./img/blogimage3.jpg";
// import img4 from "./img/blogimage4.jpg";
// import img5 from "./img/blogimage5.jpg";
// import img6 from "./img/blogimage6.jpg";
import "./Blogs.css";
import Block from "../components/block";
const fetchBlogs = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8085/doc/");
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
    if(confirm("Are you sure you want to add this blog?")===true)
    {
    
    fetch("http://localhost:8085/doc/", {
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
          setArticles(blogs.data)
         });
        resetData();
      }) 
    }
  };

  useEffect(() => {
    fetchBlogs().then((blogs) => {
     setArticles(blogs.data)
    });
  }, []);
  return (
    <div className="app-container bg-red-300">
      <div className="max-width-1 m-auto">
        <hr />
      </div>
      <div className="m-auto content max-width-1 my-2">
        <div className="content-left">
          <h1 className="font-bold text-3xl">The Heaven for Bloggers</h1>
          <p className="para text-lg">
            iBlog is a website which lets you submit an article which upon
            approval will be up on our website and you can get a good amount of
            reach from here!
          </p>
          <p className="para text-lg">
            My Halloween decorations are staying in the box this year. To be
            honest, they didn&apos;t make it out of the box last year either. My
            Halloween spirit has officially been bludgeoned to death by
            teenagers who no longer care and a persistent October fear of the
            Northern California wildfires. And speaking of fear, isn&apos;t
            there more than enough of that going around? Maybe all of us can
            pretend that Halloween isn&apos;t even happening this year?
          </p>
        </div>
        <div className="content-right">
          <img src={img3} alt="" />
        </div>
      </div>
      <div className="max-width-1 m-auto">
        <hr />
      </div>
      <div>
          <button
            onClick={() => {
              setShowAddBlog(true);
            }}
          >
            Add Blogs
          </button>
        </div>
      <div className="home-articles max-width-1 m-auto font2">
        <h2>Featured Articles</h2>
        {articles.map((article, index) => (
          <div key={index}>
            <Card
              details={article}
            />
            <button className="read-more-button">Read More</button>
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
              <input
                type="text"
                placeholder="Enter Title"
                onChange={(e) => setAddTitle(e.target.value)}
                value={addTitle}
                className="border-solid border-red-800 border-2 p-3"
              />
              <input
                type="text"
                placeholder="Text"
                onChange={(e) => setAddText(e.target.value)}
                value={addText}
                className="border-solid border-red-800 border-2 p-3"
              />
              <input
                type="date"
                placeholder="Date"
                onChange={(e) => setAddDate(e.target.value)}
                value={addDate}
                className="border-solid border-red-800 border-2 p-3"
              />
              <input
                type="text"
                placeholder="Image URL"
                onChange={(e) => setAddImage(e.target.value)}
                value={addImage}
                className="border-solid border-red-800 border-2 p-3"
              />
              <input
                type="text"
                placeholder="Author"
                onChange={(e) => setAddAuthor(e.target.value)}
                value={addAuthor}
                className="border-solid border-red-800 border-2 p-3"
              />
              <button
                className="border-solid border-red-800 border-2 p-3 text-red-800"
                onClick={() => handleAddBlog()}
              >
                Add
              </button>
              <button
                className=" p-3 text-red-800"
                onClick={() => {
                  resetData();
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ): null }
    </div>
  );
};

export default Blog;