import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  getSpecificClassmate,
  getClassmatesList,
  getListOfSuperlatives,
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
  const [allSuperlatives, setAllSuperlatives] = useState([]);
  const [rerender, setRerender] = useState(false);
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
    getMessagesByRecipient(userId).then((msgObj) => {
      setMyMessages(msgObj);
    });
  }, [userId, rerender]);

  useEffect(() => {
    getClassmatesList().then((mateArray) => {
      setAllClassmates(mateArray);
    });
  }, []);

  useEffect(() => {
    getListOfSuperlatives().then((superArray) => {
      setAllSuperlatives(superArray);
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

    postNewMessage(newMessageObj)
      .then(() => {
        setNewMessage({
          text: "",
          timestamp: "",
          senderId: 0,
          recipientId: 0,
          read: false,
        });
        document.getElementById("message").value = "";
      })
      .then(() => {
        setRerender(!rerender);
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
        {allSuperlatives.map((superObj) => {
          if (superObj.id === specificMate.superlativeId) {
            return <h3>{superObj.text}</h3>;
          }
        })}
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
              value={newMessage.text}
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
