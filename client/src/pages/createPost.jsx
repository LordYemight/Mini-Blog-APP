import { useState } from 'react';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useNavigate } from 'react-router-dom';
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

const CreatePost = () => {
  const navigate = useNavigate(); 
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('')
  const [files, setFiles] = useState('');

  async function createNewPost (e) {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
    e.preventDefault();

    try {
      const response = await axios.post('/post', data, {});

      if (response.status === 200) {
        alert('Post created successfully!');
        navigate('/');
        setTitle('');
        setSummary('');
        setContent('');
        setFiles('');
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error);
      } else {
        alert('An error occurred during post creation. Please try again later.');
      }
    }
  }

  return (
    <form onSubmit={createNewPost}>
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
      <button style={{marginTop: '5px'}}>Create Post</button>
    </form>
  )
};

export default CreatePost;