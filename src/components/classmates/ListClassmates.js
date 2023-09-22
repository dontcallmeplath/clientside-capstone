import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getClassmatesList } from "../../services/classmateService/classmateService.js";
import "./ClassmatesList.css";

export const ClassmatesList = () => {
  const [classmates, setClassmates] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getClassmatesList().then((classArr) => {
      setClassmates(classArr);
    });
  }, []);

  return (
    <>
      <div className="classmate-container">
        {classmates.map((mate) => {
          return (
            <div key={mate.id} className="classmate-card">
              <img
                src={mate.imageUrl}
                alt={mate.name}
                className="classmate-img"
                onClick={() => {
                  navigate(`/users/${mate.id}`);
                }}
              ></img>
            </div>
          );
        })}
      </div>
      <div className="classmate-name-list-container">
        <ul className="classmate-name-list">
          {classmates.map((mate) => {
            return (
              <li key={mate.id} className="classmate-name">
                {mate.name}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
