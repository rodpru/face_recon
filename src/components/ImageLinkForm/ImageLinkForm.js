import React from "react";

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
  return (
    <div>
      <p className="f3">
        {"This magic brain will detect faces in your pictures, give it a try!!"}
      </p>
      <div>
        <div className="pa4 br3 shadow">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            onChange={onInputChange}
          />
          <button onClick=() className="w-30 grow f4 link ph3 pv2 dib white bg-light-red">
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
