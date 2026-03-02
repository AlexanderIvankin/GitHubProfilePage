import React from "react";
import { useState, useEffect } from "react";
import SearchInput from "../../components/SearchInput/SearchInput";
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
      <div
        className="background-image"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
      <SearchInput onSelectProfile={handleProfileSelect} />
      {user && (
        <div className="user-profile">
          <img
            className="profile-avatar"
            src={user.avatar_url}
            alt="user avatar"
          />
          <div className="profile-stats">
            <div className="profile-followers"></div>
            <div className="profile-following"></div>
            <div className="profile-location"></div>
          </div>
          <div className="profile-info">
            <h2 className="profile-name">{user.name}</h2>
            <p className="search-result-description">
              {user.bio || "No bio available"}
            </p>
          </div>
          <div className="profile-repos"></div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
