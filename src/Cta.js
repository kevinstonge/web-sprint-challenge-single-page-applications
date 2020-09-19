import React from "react";
function Cta(props) {
  return (
    <>
      <div className="ctaContainer">
        <h2>hungry? click the button below to order pizza!</h2>
        <button
          className="ctaButton"
          onClick={() => props.setFormVisible(true)}
        >
          order pizza!
        </button>
      </div>
    </>
  );
}

export default Cta;
