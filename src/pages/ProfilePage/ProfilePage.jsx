import React from "react";
// import Button from '../../components/common/Button/Button';
import "./ProfilePage.css";
import bgImage from "../../assets/images/hero-image-github-profile.jpg";
import bgImageSm from "../../assets/images/hero-image-github-profile-sm.jpg";

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <div
        className="background-image"
        style={{ "--bg-image": `url(${bgImage})` }}
      ></div>
    </div>
  );
};

export default ProfilePage;
