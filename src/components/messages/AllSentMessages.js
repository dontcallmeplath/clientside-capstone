import React from "react";
import { useEffect, useState } from "react";
import { getAllMessagesByUserId } from "../../services/messageService/messageService.js";

export const AllSentMessages = () => {
  const [currentUser, setCurrentUser] = useState({});
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
      <div>
        <h3>MY MESSAGES</h3>
        <ul>
          {mySentMessages.map((msgArr) => {
            return (
              <li key={msgArr.id}>
                {msgArr.text}
                <button>DELETE</button>
                <button>EDIT</button>
              </li>
            );
          })}
        </ul>
      </div>
      ;
    </>
  );
};
