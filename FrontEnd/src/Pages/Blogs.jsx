//import React from "react";
import Card from "./Card.jsx";
import img1 from "./img/blogimage1.jpg";
import img2 from "./img/blogimage2.jpg";
import img3 from "./img/blogimage3.jpg";
import img4 from "./img/blogimage4.jpg";
import img5 from "./img/blogimage5.jpg";
import img6 from "./img/blogimage6.jpg";
import "./Blogs.css";

const Blog = () => {
  const articles = [
    {
      imgSrc: img1,
      title: "Title 1",
      author: "Author 1",
      date: "07 January | 6 min read",
      text: "Lucknow, with its vibrant culture and rich history, is seamlessly connected by an intricate web of trains, each journey narrating tales of tradition and modernity.",
    },
    {
      imgSrc: img2,
      title: "Title 2",
      author: "Author 2",
      date: "08 January | 7 min read",
      text: "In the heart of Badaun, where the past meets the present, the train journeys become a captivating narrative, weaving through the cultural tapestry of this historic city.",
    },
    {
      imgSrc: img3,
      title: "Title 3",
      author: "Author 3",
      date: "09 January | 8 min read",
      text: "Lucknow's sweets, from Shahi Tukda to Malai Gilori, encapsulate the city's rich culinary heritage in every delicious bite.",
    },
    {
      imgSrc: img4,
      title: "Title 4",
      author: "Author 4",
      date: "10 January | 9 min read",
      text: "Lucknow's ancient monuments bear witness to a majestic past, intricately carved stones whispering tales of a bygone era, history alive in the walls.",
    },
    {
      imgSrc: img5,
      title: "Title 5",
      author: "Author 5",
      date: "11 January | 10 min read",
      text: "Diwali in Lucknow dazzles with vibrant lights, joyous celebrations, and a cultural spectacle, illuminating the city's spirit and charm.",
    },
    {
      imgSrc: img6,
      title: "Title 6",
      author: "Author 6",
      date: "12 January | 11 min read",
      text: "Badaimbada's scenic trains weave through history, capturing timeless charm and revealing the beauty of rural India.",
    },
  ];

  return (
    <div className="app-container bg-red-300">
      <div className="max-width-1 m-auto">
        <hr />
      </div>
      <div className="m-auto content max-width-1 my-2">
        <div className="content-left">
          <h1>The Heaven for Bloggers</h1>
          <p className="para">
            iBlog is a website which lets you submit an article which upon
            approval will be up on our website and you can get a good amount of
            reach from here!
          </p>
          <p className="para">
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
      <div className="home-articles max-width-1 m-auto font2">
        <h2>Featured Articles</h2>
        <div className="year-box adjust-year"></div>
        {articles.map((article, index) => (
          <div key={index}>
            <Card
              imgSrc={article.imgSrc}
              title={article.title}
              author={article.author}
              date={article.date}
              text={article.text}
            />
            <button className="read-more-button">Read More</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
