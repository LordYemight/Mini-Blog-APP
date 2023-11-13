import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { format } from 'date-fns';
import axios from 'axios'; // Import axios
import UserContext from "../context/userContext";
import '../design/postpage.css';

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    // Use axios to fetch data
    axios.get(`/post/${id}`)
      .then(response => {
        setPostInfo(response.data);
      })
      .catch(error => {
        console.error('Error fetching post data:', error);
      });
  }, [id]);

  if (!postInfo) return '';

  let wasDate = new Date(postInfo.createdAt);

  return (
    <div className="postPage">
      <h1 className="Titles">{postInfo.title}</h1>
      <time className="time">{format(wasDate, 'MMM d, yyyy HH:MM')}</time>
      <div className="Authorr"><span>by</span> @{postInfo.author.username}</div>
      {userInfo.id === postInfo.author._id && (
        <div className="edit-now">
          <Link className="edit" to={`/edit/${postInfo._id}`}>
            Edit this post
          </Link>
        </div>
      )}
      <div className="image">
        <img className='img' src={`http://localhost:5000/${postInfo.file}`} alt="Post" />
      </div>
      <div className='body' dangerouslySetInnerHTML={{ __html: postInfo.content }} />
    </div>
  );
}

export default PostPage;
