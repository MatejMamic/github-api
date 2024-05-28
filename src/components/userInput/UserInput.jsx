import React, { useState } from "react";
import styles from "./UserInput.module.scss";
import ResetButton from "../resetButton/ResetButton";
import RepositoryList from "../repositoryList/RepositoryList";

export default function UserInput() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const fetchGitHubUserData = async () => {
    setError(null);
    if (username.trim() === "") {
      setError("Username cannot be empty");
      return;
    }
    setIsFetching(true);
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error("User not found");
      }
      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError(err.message);
      setIsFetching(false);
    }
  };

  const resetPage = () => {
    setUsername("");
    setUserData(null);
    setError(null);
    setIsFetching(false);
  };

  return (
    <div className={styles.container}>
      {!isFetching && !userData && (
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
            className={styles.input}
          />
          <button onClick={fetchGitHubUserData} className={styles.button}>
            Fetch User
          </button>
        </div>
      )}
      {error && <div className={styles.error}>{error}</div>}
      {userData && (
        <div className={styles.result}>
          <img
            src={userData.avatar_url}
            alt="Avatar"
            className={styles.avatar}
          />
          <h3>{userData.name}</h3>
          <p>{userData.login}</p>
          <p>{userData.location}</p>
          <p>{userData.bio}</p>

          <RepositoryList username={username} />
          <ResetButton onReset={resetPage} />
        </div>
      )}
    </div>
  );
}
