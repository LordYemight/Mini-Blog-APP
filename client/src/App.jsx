import './App.css';
import HomePage from './pages/homePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import {UserContextProvider} from './context/userContext';
import CreatePost from './pages/createPost';
import PostPage from './pages/postPage';
import EditPost from './pages/editPost';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;
axios.defaults.headers = { 'Content-Type': 'application/json' }

function App() {
  return (
    <UserContextProvider>
      <Router>
      <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeButton={false} // Set closeButton to false
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Route>
        </Routes>
      </Router>
    </UserContextProvider>
 
  );
}
 
export default App;
