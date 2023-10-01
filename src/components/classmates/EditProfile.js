import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getSpecificClassmate,
  getListOfSuperlatives,
  editMate,
} from "../../services/classmateService/classmateService.js";
import "../classmates/ProfileViews.css";

export const EditProfile = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [specificMate, setSpecificMate] = useState({});
  const [superlativeList, setSuperlativeList] = useState([]);
  const [classmate, setClassmate] = useState({});
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
    getListOfSuperlatives().then((superList) => {
      setSuperlativeList(superList);
    });
  }, [currentUser]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedMate = {
      id: specificMate.id,
      name: specificMate.name,
      imageUrl: specificMate.imageUrl,
      capstoneLink: specificMate.capstoneLink,
      showLink: specificMate.showLink,
      superlativeId: specificMate.superlativeId,
      email: specificMate.email,
    };

    editMate(updatedMate).then(() => {
      navigate(`/users/${specificMate.Id}`);
    });
  };

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
          <input
            name="imageUrl"
            value={specificMate.imageUrl ? specificMate.imageUrl : ""}
            type="text"
            placeholder={specificMate.imageUrl}
            size="80"
            onChange={(event) => {
              const mateCopy = { ...specificMate };
              mateCopy.imageUrl = event.target.value;
              setClassmate(mateCopy);
            }}
          />

          <label>Update name</label>
          <input
            name="name"
            value={specificMate.name ? specificMate.name : ""}
            placeholder={specificMate.name}
            size="80"
            onChange={(event) => {
              const mateCopy = { ...specificMate };
              mateCopy.name = event.target.value;
              setClassmate(mateCopy);
            }}
          />

          <label>Choose superlative</label>
          <select
            name="superlativeId"
            value={specificMate.superlativeId}
            onChange={(event) => {
              const mateCopy = { ...specificMate };
              mateCopy.superlativeId = event.target.value;
              setClassmate(mateCopy);
            }}
          >
            <option value={0}>Most likely to succeed</option>
            {superlativeList.map((superObj) => {
              return (
                <option key={superObj.id} value={superObj.id}>
                  {superObj.text}
                </option>
              );
            })}
          </select>

          <label>Update Capstone URL</label>
          <input
            name="capstoneUrl"
            value={specificMate.capstoneLink ? specificMate.capstoneLink : ""}
            type="text"
            placeholder={specificMate.capstoneLink}
            size="80"
            onChange={(event) => {
              const mateCopy = { ...specificMate };
              mateCopy.capstoneLink = event.target.value;
              setClassmate(mateCopy);
            }}
          />

          <label>
            <input
              type="radio"
              name="showLink"
              value={specificMate.showLink}
              onChange={(event) => {
                const mateCopy = { ...specificMate };
                mateCopy.showLink = !mateCopy.showLink;
                setClassmate(mateCopy);
              }}
            />
            Show link ?
          </label>
          <label>Update Login Email</label>
          <input placeholder={specificMate.email} size="80" />
        </div>
        {/*will eventually want to devote more time to displaying text of the superlative 
        will also want to display link based on value of bool in data*/}
      </div>
      <div className="button-container-edit-prof">
        <button className="submit-button" onClick={handleSubmit}>
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
