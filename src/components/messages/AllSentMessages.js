import React from "react";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  getAllMessagesByUserId,
  deleteMsg,
  editMsg,
} from "../../services/messageService/messageService.js";
import { getClassmatesList } from "../../services/classmateService/classmateService.js";
import "../messages/MessageViews.css";

export const AllSentMessages = () => {
  const { userId } = useParams();
  const [mySentMessages, setMySentMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const [users, setUsers] = useState([]);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    getAllMessagesByUserId(userId).then((msgArray) => {
      setMySentMessages(msgArray);
    });
  }, [userId, rerender]);

  useEffect(() => {
    getClassmatesList().then((userArray) => {
      setUsers(userArray);
    });
  }, []);

  const deleteThisMsg = (id) => {
    deleteMsg(id).then(() => {
      setRerender(!rerender);
    });
  };

  const editThisMsg = (msgText, id) => {};

  return (
    <>
      <div className="sent-message-container">
        <h3>MY SENT MESSAGES</h3>
        <ul className="sent-message-list">
          {mySentMessages.map((msgObj) => {
            return (
              <>
                <li key={msgObj.id} className="sent-message">
                  {users.map((user) => {
                    if (user.id === msgObj.recipientId) {
                      return (
                        <span key={msgObj.recipientId}>
                          Sent to {user.name} :
                        </span>
                      );
                    }
                  })}
                  <div
                    id="text-box"
                    contenteditable="true"
                    value={msgObj.text}
                    onInput={(e) => {
                      setMsg(e.target.textContent);
                    }}
                  >
                    {msgObj.text}
                  </div>

                  <div className="button-container-msg">
                    <button
                      className="delete-button"
                      onClick={() => {
                        deleteThisMsg(msgObj.id);
                      }}
                    >
                      DELETE
                    </button>
                    <button
                      className="edit-button"
                      onClick={(event) => {
                        editMsg(msgObj, msg, msgObj.id);
                      }}
                    >
                      SAVE EDIT
                    </button>
                  </div>
                </li>
              </>
            );
          })}
        </ul>
      </div>
      ;
    </>
  );
};
