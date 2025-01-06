import React from "react";
import "./ImageStyle.css"; // Ensure the CSS file contains relevant styles
import Avatar from "../../assets/images/formAvatar.png";

const DisplayImage = ({ image, setImage, name }) => {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "3px 0",
      }}
    >
      <label>
        Select Picture
        <span style={{ color: "red" }}>*</span>
      </label>

      {/* Image Wrapper as a Clickable Label */}
      <label
      className="image-wrapper"
        htmlFor={name}
        style={{
          cursor: "pointer",
          margin: "10px 0",
        }}
      >
        <img
           src={
            image instanceof File
              ? URL.createObjectURL(image) // Preview the selected file
              : image
              ? `http://localhost:8888${image}` // Display image from server
              : Avatar // Default avatar
          }
          // src={image ? URL.createObjectURL(image) : Avatar}
          alt="Default Avatar"
          style={{
            borderRadius: "50%",
            height: "100px",
            width: "100px",
            objectFit: "cover",
            border: "2px solid #ccc",
          }}
        />
      </label>

      {/* Hidden Input */}
      <input
        type="file"
        id={name}
        name={name}
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
          }
        }}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default DisplayImage;
