import React from "react";
import { useEffect, useState, Link } from "react";
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
      <div className="container">
        <img
          src={specificMate.imageUrl}
          alt={specificMate.name}
          className="classmate-img"
          key={specificMate.id}
        ></img>
        <h1>{specificMate.name}</h1>
        <h3>{specificMate.superlativeId}</h3>{" "}
        {/*will eventually want to devote more time to displaying text of the superlative 
        will also want to display link based on value of bool in data*/}
        <h3>{specificMate.linkURL}</h3>
      </div>
    </>
  );
};