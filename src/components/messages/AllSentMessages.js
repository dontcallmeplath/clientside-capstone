import React from "react";
import { useEffect, useState } from "react";
import {
  getAllMessagesByUserId,
  deleteMsg,
} from "../../services/messageService/messageService.js";
import "../messages/MessageViews.css";

export const AllSentMessages = () => {
  const [currentUser, setCurrentUser] = useState([]);
  const [mySentMessages, setMySentMessages] = useState([]);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    const localYearbookUser = localStorage.getItem("yearbook_user");
    const yearbookUserObject = JSON.parse(localYearbookUser);
    setCurrentUser(yearbookUserObject.id);
  }, []);

  useEffect(() => {
    getAllMessagesByUserId(currentUser).then((msgArray) => {
      setMySentMessages(msgArray);
    });
  }, [currentUser, rerender]);

  const deleteThisMsg = (id) => {
    deleteMsg(id).then(() => {
      setRerender(!rerender);
    });
  };

  return (
    <>
      <div className="sent-message-container">
        <h3>MY SENT MESSAGES</h3>
        <ul className="sent-message-list">
          {mySentMessages.map((msgObj) => {
            return (
              <>
                <li key={msgObj.id} className="sent-message">
                  {msgObj.text}
                </li>
                <div className="button-container-msg">
                  <button
                    className="delete-button"
                    onClick={() => {
                      deleteThisMsg(msgObj.id);
                    }}
                  >
                    DELETE
                  </button>
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
