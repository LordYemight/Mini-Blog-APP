import { useNavigate, useParams } from 'react-router-dom';
import React, {useState}  from 'react'
import { useEffect } from 'react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'
import "../design/workOnPost.css"
import axios from 'axios';

const modules = {
  toolbar:[ 
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']
  ]                                         // remove formatting button
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
]


const EditPost =  () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('')
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false)

  
  useEffect(() => {
    axios.get(`/post/${id}`)
      .then(response => {
        const postInfo = response.data;
        setTitle(postInfo.title);
        setSummary(postInfo.summary);
        setContent(postInfo.content);
        setFiles(postInfo.file);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
      });
  }, [id]);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if (files?.[0]) {
      data.set('file', files?.[0]);
    }

    try {
      const response = await axios.put('/post', data, {
        withCredentials: true,
      });

      if (response.status === 200) {
        alert('Post updated successfully!');
        setRedirect(true);
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error);
      } else {
        alert('An error occurred during post update. Please try again later.');
      }
    }
  }
  if (redirect) {
    return navigate('/post/'+ id);
  }


return (
  <form onSubmit={updatePost}>
    <input
      className='inputCreate'
      type = 'title'
      placeholder="Title"
      value={title}
      onChange={e => setTitle(e.target.value)}
    />
     <input
      className='inputCreate'
      type = 'summary'
      placeholder="Summary"
      value={summary}
      onChange={e => setSummary(e.target.value)}
    />
     <input
      className='imageR'
      type = 'file'
      onChange={e => setFiles(e.target.files)}
    />
    <ReactQuill
      value = {content}
      onChange={newValue=>setContent(newValue) }
      modules={modules} 
      formats={formats}
    />
    <button style={{marginTop: '5px'}}>Update Post</button>
  </form>
)
}

export default EditPost;