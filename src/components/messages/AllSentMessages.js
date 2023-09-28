import React from "react";
import { useEffect, useState } from "react";
import { getAllMessagesByUserId } from "../../services/messageService/messageService.js";
import "../messages/MessageViews.css";

export const AllSentMessages = () => {
  const [currentUser, setCurrentUser] = useState([]);
  const [mySentMessages, setMySentMessages] = useState([]);

  useEffect(() => {
    const localYearbookUser = localStorage.getItem("yearbook_user");
    const yearbookUserObject = JSON.parse(localYearbookUser);
    setCurrentUser(yearbookUserObject.id);
  }, []);

  useEffect(() => {
    getAllMessagesByUserId(currentUser).then((msgArray) => {
      setMySentMessages(msgArray);
    });
  }, [currentUser]);

  return (
    <>
      <div className="sent-message-container">
        <h3>MY SENT MESSAGES</h3>
        <ul className="sent-message-list">
          {mySentMessages.map((msgArr) => {
            return (
              <>
                <li key={msgArr.id} className="sent-message">
                  {msgArr.text}
                </li>
                <div className="button-container-msg">
                  <button className="delete-button">DELETE</button>
                  <button className="edit-button">EDIT</button>
                </div>
              </>
            );
          })}
        </ul>
      </div>
      ;
    </>
  );
};
