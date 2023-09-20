import { useEffect, useState, Text, Linking } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSpecificClassmate } from "../../services/classmateService/classmateService.js";

export const UserDetails = () => {
  const { userId } = useParams();

  const [specificMate, setSpecificMate] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    getSpecificClassmate(userId).then((mateObj) => {
      console.log(mateObj);
      setSpecificMate(mateObj);
    });
  }, [userId]);

  return (
    <div className="container">
      <img
        src={specificMate.imageUrl}
        alt={specificMate.name}
        className="classmate-img"
      ></img>
      <h1>{specificMate.name}</h1>
      <h3>{specificMate.superlativeId}</h3>
      {specificMate.showLink ? (
        <h3>
          <Text
            style={{ color: "blue" }}
            onPress={() => Linking.openURL(specificMate.linkURL)}
          >
            Capstone Project for Client-Side
          </Text>
        </h3>
      ) : (
        ""
      )}
    </div>
  );
};
