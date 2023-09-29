import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSpecificClassmate } from "../../services/classmateService/classmateService.js";
import { getMessagesByRecipient } from "../../services/messageService/messageService.js";

export const UserDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [specificMate, setSpecificMate] = useState({});
  const [myMessages, setMyMessages] = useState([]);

  useEffect(() => {
    getSpecificClassmate(userId).then((mateObj) => {
      setSpecificMate(mateObj);
    });
    getMessagesByRecipient(userId).then((msgObj) => {
      setMyMessages(msgObj);
    });
  }, [userId]);

  return (
    <>
      <div>
        <button
          className="previous-button"
          onClick={() => {
            let prevId = `${specificMate.id}`;
            prevId = prevId - 1;
            if (prevId >= 1) {
              navigate(`/users/${prevId}`);
            } else {
              navigate(`/`);
            }
          }}
        >
          Previous
        </button>
      </div>
      <div className="classmate-detail-container">
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
        <h3>{specificMate.capstoneLink}</h3>
      </div>
      <div>
        <button
          className="next-button"
          onClick={() => {
            let nextId = `${specificMate.id}`;
            nextId = parseInt(nextId) + 1;
            if (nextId < 24) {
              navigate(`/users/${nextId}`);
            } else {
              navigate(`/`);
            }
          }}
        >
          Next
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
        <div className="msg-box-container">
          <label className="msg-box-label" for="message">
            Sign my Yearbook:
          </label>
          <textarea
            className="add-message-box"
            id="message"
            name="message"
            rows="5"
            cols="33"
            required
          ></textarea>
          <button className="add-msg-button">ADD MESSAGE</button>
        </div>
      </div>
    </>
  );
};
