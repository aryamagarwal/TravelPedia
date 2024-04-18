import React from "react";
import "./Card.css";

const Card = ({ imgSrc, title, author, date, text, prop }) => {
  console.log("imgSrc:", imgSrc);
  console.log("title:", title);
  console.log("author:", author);
  console.log("date:", date);
  console.log("text:", text);
  console.log("prop:", prop);

  return (
    <div className="card m-4">
      <div className="card-img ">
        <img src={imgSrc} alt="article" />
      </div>
      <div className="card-content">
        <div className="card-text">
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
        <div className="card-info">
          <div className="author">{author}</div>
          <div className="date">{date}</div>
        </div>
      </div>
      <div className="card-prop">{prop}</div>
    </div>
  );
};


export default Card;
