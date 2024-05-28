import React, { useState, useEffect } from "react";
import styles from "./RepositoryList.module.scss"; // Import the module styles

function RepositoryList({ username }) {
  const [repositories, setRepositories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }
        const data = await response.json();
        setRepositories(data.map((repo) => repo.name));
      } catch (error) {
        setError(error.message);
      }
    };

    fetchRepositories();
  }, [username]);

  return (
    <div className={styles.container}>
      <h2>Repositories</h2>
      {error && <p className={styles.error}>{error}</p>}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Repository Name</th>
          </tr>
        </thead>
        <tbody>
          {repositories.map((repo) => (
            <tr key={repo}>
              <td>{repo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RepositoryList;
