import React from "react";
import { useState, useEffect } from "react";
import "./UserProfile.css";

function UserProfile({ user }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAllRepos, setShowAllRepos] = useState(false);
  const defaultShowRepos = 4;

  useEffect(() => {
    const fetchAllRepos = async () => {
      if (!user?.login) return;

      setLoading(true);
      let page = 1;
      let allRepos = [];
      let hasMorePages = true;

      try {
        while (hasMorePages) {
          const response = await fetch(
            `https://api.github.com/users/${user.login}/repos?` +
              `per_page=100&page=${page}&sort=updated`,
          );

          const data = await response.json();

          if (data.length === 0) {
            hasMorePages = false;
          } else {
            allRepos = [...allRepos, ...data];
            page++;

            const linkHeader = response.headers.get("Link");
            if (!linkHeader || !linkHeader.includes('rel="next"')) {
              hasMorePages = false;
            }
          }

          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        setRepos(allRepos);
      } catch (error) {
        console.error("Error fetching repos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllRepos();
  }, [user]);

  const displayedRepos = showAllRepos
    ? repos
    : repos.slice(0, defaultShowRepos);

  return (
    <div className="user-profile">
      <div className="profile-top">
        <div className="profile-avatar-container">
          <img
            className="profile-avatar"
            src={user.avatar_url}
            alt="user avatar"
          />
        </div>
        <div className="profile-stats">
          <div className="profile-followers">
            <span className="profile-followers-text">Followers</span>
            <span className="profile-followers-count">{user.followers}</span>
          </div>
          <div className="profile-following">
            <span className="profile-following-text">Following</span>
            <span className="profile-following-count">{user.following}</span>
          </div>
          <div className="profile-location">
            <span className="profile-location-text">Location</span>
            <span className="profile-location-info">
              {user.location || "Unknown"}
            </span>
          </div>
        </div>
      </div>

      <div className="profile-info">
        <h2 className="profile-name">{user.name}</h2>
        <p className="profile-description">{user.bio || "No bio available"}</p>
      </div>

      {loading && (
        <div className="repos-loading">
          <p>Loading repositories...</p>
        </div>
      )}

      {!loading && repos.length === 0 && (
        <div className="no-repos">
          <p>No repositories found</p>
        </div>
      )}

      {!loading && repos.length > 0 && (
        <>
          <div className="profile-repos">
            {displayedRepos.map((repo) => (
              <div key={repo.id} className="profile-repo-card">
                <h3 className="repo-card-header">{repo.name}</h3>
                <p className="repo-card-description">
                  {repo.description || "No description"}
                </p>

                <div className="repo-card-footer">
                  <div className="repo-card-stats">
                    {repo.license && (
                      <div className="repo-card-license">
                        <span className="license-text">{repo.license.spdx_id}</span>
                      </div>
                    )}
                    <div className="repo-card-forks">
                      <span className="forks-text">{repo.forks_count}</span>
                    </div>
                    <div className="repo-card-stars">
                      <span className="stars-text">{repo.stargazers_count}</span>
                    </div>
                  </div>

                  <div className="repo-card-updated">
                    <span className="updated-text">
                      Updated {new Date(repo.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {repos.length > defaultShowRepos && (
            <div className="profile-view-all-repos">
              <button
                className="view-repos-button"
                onClick={() => setShowAllRepos(!showAllRepos)}
              >
                {showAllRepos
                  ? "Show less"
                  : `View all repositories (${repos.length})`}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default UserProfile;