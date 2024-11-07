// src/WordPressPosts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function WordPressPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts on mount
  useEffect(() => {
    const apiUrl = 'http://localhost/othisi1/index.php/cart/';  // Update with your WordPress site URL

    axios
      .get(apiUrl)
      .then((response) => {
        setPosts(response.data);  // Save posts to state
        setLoading(false);         // Set loading to false
      })
      .catch((err) => {
        setError(err);             // Handle errors
        setLoading(false);
      });
  }, []);

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
