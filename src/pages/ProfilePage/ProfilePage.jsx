import React from "react";
import { useState } from "react";
import SearchInput from "../../components/SearchInput/SearchInput";
import UserProfile from "./UserProfile";
import useGitHubProfile from "../../hooks/useGitHubProfile";

import bgImage from "../../assets/images/hero-image-github-profile.jpg";
import bgImageSm from "../../assets/images/hero-image-github-profile-sm.jpg";

import "./ProfilePage.css";

const ProfilePage = () => {
  const [username, setUsername] = useState("GitHub");
  const { user, loading, error } = useGitHubProfile(username);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleProfileSelect = (newUsername) => {
    setUsername(newUsername);
  };

  return (
    <div className="profile-page">
      <div className="background-proportion-container">
        <img
          className="proportion-keeper"
          src={bgImage}
          alt=""
          aria-hidden="true"
        />
        <div
          className="background-image"
          style={{
            '--bg-image-desktop': `url(${bgImage})`,
            '--bg-image-mobile': `url(${bgImageSm})`
          }}
        ></div>
        <SearchInput onSelectProfile={handleProfileSelect} />
        {user && <UserProfile user={user} />}
      </div>
    </div>
  );
};

export default ProfilePage;
