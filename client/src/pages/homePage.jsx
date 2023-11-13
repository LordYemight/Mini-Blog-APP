import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import Post from '../components/post';

function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Use axios to fetch data
    axios.get('/post')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return (
    <div>
      {posts.length > 0 && posts.map(post => (
        <Post key={post._id} {...post} />
      ))}
    </div>
  );
}

export default HomePage;
