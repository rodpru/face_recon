import React from "react";
import "./FaceRecon.css";

const FaceRecon = ({ imageUrl, box }) => {
  return (
    <div className=" center na">
      <div className="absolute mt2">
        <img
          id="inputimage"
          alt="FaceRecon"
          src={imageUrl}
          width="500px"
          height="auto"
        />
      </div>
      <div
        className="bounding-box"
        style={{
          top: box.topRow,
          right: box.rightCol,
          bottom: box.bottomRow,
          left: box.leftCol,
        }}
      ></div>
    </div>
  );
};

export default FaceRecon;
