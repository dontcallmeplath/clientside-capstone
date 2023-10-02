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
      navigate(`/users/${currentUser}/profile`);
    });
  };

  return (
    <form>
      <div className="container">
        <img
          src={specificMate.imageUrl}
          alt={specificMate.name}
          className="profile-img"
        ></img>
        <div className="edit-options-container">
          <fieldset>
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
                setSpecificMate(mateCopy);
              }}
            />
          </fieldset>
          <fieldset>
            <label>Update name</label>
            <input
              name="name"
              value={specificMate.name ? specificMate.name : ""}
              placeholder={specificMate.name}
              size="80"
              onChange={(event) => {
                const mateCopy = { ...specificMate };
                mateCopy.name = event.target.value;
                setSpecificMate(mateCopy);
              }}
            />
          </fieldset>
          <fieldset>
            <label>Choose superlative</label>
            <select
              name="superlativeId"
              value={
                specificMate.superlativeId ? specificMate.superlativeId : ""
              }
              onChange={(event) => {
                const mateCopy = { ...specificMate };
                mateCopy.superlativeId = parseInt(event.target.value);
                setSpecificMate(mateCopy);
              }}
            >
              <option value={0}></option>
              {superlativeList.map((superObj) => {
                return (
                  <option
                    value={superObj.id}
                    key={superObj.id}
                    text={superObj.text}
                    // placeholder={superObj.id}
                  >
                    {superObj.text}
                  </option>
                );
              })}
            </select>
          </fieldset>
          <fieldset>
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
                setSpecificMate(mateCopy);
              }}
            />
          </fieldset>
          <fieldset>
            <label>
              <input
                type="radio"
                name="showLink"
                value={specificMate.showLink}
                onChange={(event) => {
                  const mateCopy = { ...specificMate };
                  mateCopy.showLink = !mateCopy.showLink;
                  setSpecificMate(mateCopy);
                }}
              />
              Show link ?
            </label>
          </fieldset>
          <fieldset>
            <label>Update Login Email</label>
            <input placeholder={specificMate.email} size="80" />
          </fieldset>
        </div>
      </div>
      <div className="button-container-edit-prof">
        <button className="submit-button" type="submit" onClick={handleSubmit}>
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
    </form>
  );
};
