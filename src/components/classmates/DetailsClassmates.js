import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  getSpecificClassmate,
  getClassmatesList,
} from "../../services/classmateService/classmateService.js";
import { getMessagesByRecipient } from "../../services/messageService/messageService.js";
import { postNewMessage } from "../../services/messageService/messageService.js";

export const UserDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [specificMate, setSpecificMate] = useState({});
  const [allClassmates, setAllClassmates] = useState([]);
  const [myMessages, setMyMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({
    text: "",
    timestamp: "",
    senderId: 0,
    recipientId: 0,
    read: false,
  });

  useEffect(() => {
    const localYearbookUser = localStorage.getItem("yearbook_user");
    const yearbookUserObject = JSON.parse(localYearbookUser);
    setCurrentUser(yearbookUserObject.id);
  }, []);

  useEffect(() => {
    getSpecificClassmate(userId).then((mateObj) => {
      setSpecificMate(mateObj);
    });
  }, [userId]);

  useEffect(() => {
    getMessagesByRecipient(userId).then((msgObj) => {
      setMyMessages(msgObj);
    });
  }, [userId, newMessage]);

  useEffect(() => {
    getClassmatesList().then((mateArray) => {
      setAllClassmates(mateArray);
    });
  }, []);

  const handleInputChange = (event) => {
    const msgCopy = { ...newMessage };
    msgCopy.text = event.target.value;
    setNewMessage(msgCopy);
  };

  const handleSave = (event) => {
    event.preventDefault();

    const newMessageObj = {
      text: newMessage.text,
      timestamp: newMessage.timestamp,
      senderId: currentUser,
      recipientId: specificMate.id,
      read: newMessage.read,
    };

    postNewMessage(newMessageObj).then(() => {
      navigate(`/users/${specificMate.id}`);
      setNewMessage({
        text: "",
        timestamp: "",
        senderId: 0,
        recipientId: 0,
        read: false,
      });
      document.getElementById("message").value = "";
    });
  };

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
        <h3>
          <Link className="link" to={specificMate.capstoneLink}>
            {"Capstone Link"}
          </Link>
        </h3>
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
                {allClassmates.map((mateObj) => {
                  if (msgObj.senderId === mateObj.id) {
                    return (
                      <div key={msgObj.senderId}>
                        <strong>{mateObj.name} says: </strong>
                      </div>
                    );
                  }
                })}
                {msgObj.text}
              </li>
            );
          })}
        </ul>
        <div className="msg-box-container">
          <label className="msg-box-label" htmlFor="message">
            Sign my Yearbook:
          </label>
          <form>
            <textarea
              className="add-message-box"
              id="message"
              name="message"
              rows="5"
              cols="33"
              value={setNewMessage.text}
              required
              onChange={handleInputChange}
            ></textarea>
            <button
              type="submit"
              className="add-msg-button"
              onClick={handleSave}
            >
              ADD MESSAGE
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
