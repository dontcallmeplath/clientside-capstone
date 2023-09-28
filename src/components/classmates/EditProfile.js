import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getSpecificClassmate,
  getListOfSuperlatives,
} from "../../services/classmateService/classmateService.js";
import "../classmates/ProfileViews.css";

export const EditProfile = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [specificMate, setSpecificMate] = useState({});
  const [superlativeList, setSuperlativeList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const localYearbookUser = localStorage.getItem("yearbook_user");
    const yearbookUserObject = JSON.parse(localYearbookUser);
    setCurrentUser(yearbookUserObject.id);
  }, []);

  useEffect(() => {
    getSpecificClassmate(currentUser).then((mateObj) => {
      setSpecificMate(mateObj);
    });
  }, [currentUser]);

  useEffect(() => {
    getListOfSuperlatives().then((superList) => {
      setSuperlativeList(superList);
    });
  });

  return (
    <>
      <div className="container">
        <img
          src={specificMate.imageUrl}
          alt={specificMate.name}
          className="profile-img"
        ></img>
        <div className="edit-options-container">
          <label>Update Image URL</label>
          <input placeholder={specificMate.imageUrl} size="80" />

          <label>Update name</label>
          <input placeholder={specificMate.name} size="80" />

          <label>Choose superlative</label>
          <select>
            <option value={0}></option>
            {superlativeList.map((superArr) => {
              return (
                <option key={superArr.id} value={superArr.id}>
                  {superArr.text}
                </option>
              );
            })}
          </select>

          <label>Update Capstone URL</label>
          <input placeholder={specificMate.capstoneLink} size="80" />

          <label>Show link ?</label>
          <input type="radio" name="showLink" value="Yes" />

          <label>Update Login Email</label>
          <input placeholder={specificMate.email} size="80" />
        </div>
        {/*will eventually want to devote more time to displaying text of the superlative 
        will also want to display link based on value of bool in data*/}
      </div>
      <div className="button-container">
        <button
          className="submit-button"
          onClick={() => {
            // handleSubmit
          }}
        >
          SUBMIT CHANGES
        </button>
        <button
          className="sent-button"
          onClick={() => {
            navigate(`/users/${currentUser}/sent`);
          }}
        >
          SENT MESSAGES
        </button>
      </div>
    </>
  );
};
