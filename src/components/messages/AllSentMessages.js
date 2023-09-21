import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllMessagesByUserId } from "../../services/messageService/messageService.js";

export const AllSentMessages = () => {
  const { userId } = useParams();

  const [mySentMessages, setMySentMessages] = useState([]);

  useEffect(() => {
    getAllMessagesByUserId(userId).then((msgArray) => {
      setMySentMessages(msgArray);
    });
  });

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
