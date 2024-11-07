// src/WordPressPosts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import Axios for making HTTP requests

function WordPressPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from WordPress API when the component mounts
  useEffect(() => {
    const apiUrl = 'https://http://localhost/othisi1/index.php/cart/'; // Replace with your WordPress API URL

    axios
      .get(apiUrl)
      .then((response) => {
        setPosts(response.data);  // Store the posts data in state
        setLoading(false);  // Set loading state to false
      })
      .catch((err) => {
        setError(err);  // Handle any errors
        setLoading(false);  // Set loading state to false
      });
  }, []);  // Empty array ensures this effect runs only once on mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>WordPress Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title.rendered}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WordPressPosts;
