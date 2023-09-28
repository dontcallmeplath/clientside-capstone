import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSpecificClassmate } from "../../services/classmateService/classmateService.js";

export const UserDetails = () => {
  const { userId } = useParams();

  const [specificMate, setSpecificMate] = useState({});

  useEffect(() => {
    getSpecificClassmate(userId).then((mateObj) => {
      setSpecificMate(mateObj);
    });
  }, [userId]);

  return (
    <>
      <div>
        <button className="next-button">Previous</button>
      </div>
      <div className="container">
        <img
          src={specificMate.imageUrl}
          alt={specificMate.name}
          className="classmate-detail-img"
          key={specificMate.id}
        ></img>
        <h1>{specificMate.name}</h1>
        <h3>Superlative text re ID #{specificMate.superlativeId}</h3>{" "}
        {/*will eventually want to devote more time to displaying text of the superlative 
        will also want to display link based on value of bool in data*/}
        <h3>{specificMate.linkURL}</h3>
      </div>
      <div>
        <button className="previous-button">Next</button>
      </div>
    </>
  );
};
