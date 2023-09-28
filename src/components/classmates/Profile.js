import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSpecificClassmate } from "../../services/classmateService/classmateService.js";
import { getMessagesByRecipient } from "../../services/messageService/messageService.js";
import "../messages/MessageViews.css";
import "../classmates/ProfileViews.css";

export const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [specificMate, setSpecificMate] = useState({});
  const [myMessages, setMyMessages] = useState([]);

  useEffect(() => {
    getSpecificClassmate(userId).then((mateObj) => {
      setSpecificMate(mateObj);
    });
  }, [userId]);

  useEffect(() => {
    getMessagesByRecipient(userId).then((msgObj) => {
      setMyMessages(msgObj);
    });
  }, [userId]);

  return (
    <>
      <div className="container">
        <img
          src={specificMate.imageUrl}
          alt={specificMate.name}
          className="profile-img"
        ></img>
        <h1>{specificMate.name}</h1>
        <h3>Superlative = {specificMate.superlativeId}</h3>{" "}
        {/*will eventually want to devote more time to displaying text of the superlative 
        will also want to display link based on value of bool in data*/}
        <h3>
          <link to={specificMate.capstoneLink} />
        </h3>
      </div>
      <div className="button-container-profile">
        <button
          className="edit-prof-button"
          onClick={() => {
            navigate(`/users/${userId}/edit`);
          }}
        >
          EDIT PROFILE
        </button>
        <button
          className="sent-button"
          onClick={() => {
            navigate(`/users/${userId}/sent`);
          }}
        >
          SENT MESSAGES
        </button>
      </div>
      <div className="recd-message-container">
        <h3>MY MESSAGES</h3>
        <ul className="recd-message-list">
          {myMessages.map((msgObj) => {
            return (
              <li key={msgObj.id} className="recd-message">
                {msgObj.text}
              </li>
            );
          })}
        </ul>
        <button className="read-button">MARK ALL AS READ</button>
      </div>
    </>
  );
};
