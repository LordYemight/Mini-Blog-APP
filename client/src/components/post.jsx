import React from 'react';
import { format } from 'date-fns'
import { Link } from 'react-router-dom';
import '../design/post.css'
function Post({ _id, title, summary, content, author, file, createdAt
}) {
  let wasDate = new Date(createdAt)
  return (
    <div className='post'>
      <div className='postimage'>
        <Link className='postlink' to={`/post/${_id}`}>
          <img alt="img" className='postImg' src={'http://localhost:5000/' + file} />
        </Link>
      </div>
      <div className='texts'>
        <Link className='postlink' to={`/post/${_id}`}>
          <h2 className='postTitle'>{title}</h2>
        </Link>
        <p className='info'>
          <a href='' className='postauthor'>{author.username}</a>
          <time>{format(wasDate, 'MMM d, yyyy HH:MM')}</time>
        </p>
        <p className='postsummary'>{summary}...</p>
      </div>
    </div>
  )
};

export default Post; 