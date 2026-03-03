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
          {console.log(user)}
          <div className="profile-top">
            <img
              className="profile-avatar"
              src={user.avatar_url}
              alt="user avatar"
            />
            <div className="profile-stats">
              <div className="profile-followers">
                <span className="profile-followers-text">Folowers</span>
                <span className="profile-followers-count">
                  {user.followers}
                </span>
              </div>
              <div className="profile-following">
                <span className="profile-following-text">Folowing</span>
                <span className="profile-following-count">
                  {user.following}
                </span>
              </div>
              <div className="profile-location">
                <span className="profile-location-text">Location</span>
                <span className="profile-location-info">{user.location}</span>
              </div>
            </div>
          </div>
          <div className="profile-info">
            <h2 className="profile-name">{user.name}</h2>
            <p className="profile-description">
              {user.bio || "No bio available"}
            </p>
          </div>
          <div className="profile-repos">
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="profile-repo-card">
                  <h3 className="repo-card-header">Card Header</h3>
                  <p className="repo-card-info">Card description</p>
                  <div className="repo-card-stats">
                    <span className="repo-card-organisation">#</span>
                    <span className="repo-card-clones">#</span>
                    <span className="repo-card-stars">#</span>
                    <p className="repo-card-updated">updated # days ago</p>
                  </div>
                </div>
              ))}
          </div>
          <div className="profile-view-all-repos">
            <button className="view-repos-button">View all repositories</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
