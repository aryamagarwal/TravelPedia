import React from "react";
import "./Card.css";

const Card = (props) => {
 console.log(props.details);

  return (
    <div className="card m-4">
      <div className="card-img ">
        <img src={props.details.image} alt="article" />
      </div>
      <div className="card-content">
        <div className="card-text">
          <h3>{props.details.title}</h3>
          <p>{props.details.body}</p>
        </div>
        <div className="card-info">
          <div className="author">{props.details.author}</div>
          <div className="date">{props.details.date}</div>
        </div>
      </div>
      <div className="card-prop"></div>
    </div>
  );
};


export default Card;
