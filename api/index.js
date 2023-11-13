const express = require('express');
const app = express();
const cors = require('cors');
const Router = require('./routes/routes');
const mongoose  = require('./db/db');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const Post = require('./models/post');
const { postImage } = require('./utils/fileUpload');
const path = require('path')


require('dotenv/config');
PORT = process.env.PORT
MONGO_URI = process.env.MONGODB_URI
secret = process.env.SECRET_KEY

app.use('/images', express.static(__dirname + '/images'))
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use("/", Router) 
app.use(cookieParser());


app.get('/profile', (req, res) => {
  const {token} = req.cookies
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err
    res.json(info)
  })
})

app.post('/logout', (req, res) => {
  res.cookie('token', ''). json('ok')
})

app.get('/post', async (req, res) => {
  res.json( await Post.find()
  .populate('author', ['username'])
  .sort({createdAt: -1}).limit(30)
  )// to rearrange the order in terms of createdAt
  // set limit to the amount of post to 30
  
})

app.post('/post', postImage, async (req, res) => {
    try {
     
      const {token} = req.cookies
      jwt.verify(token, secret, {}, async (err, info) => {
      if (err) throw err
      const {id :authorId}= info
      const {title, content, summary} = req.body
      const file = req.file.path;
      const existingPost = await Post.findOne({title})
      if (existingPost) {
        res.status(409).json({message: 'post already exists'})
      }
      const newPost = new Post({
        title,
        summary,
        content,
        file,
        author: authorId
      }) 
      await newPost.save();
      res.status(201).json({ message: "Post successfully added", post: newPost});
     
      })
       } catch (error) {
      console.error('Error adding post', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  
) 
app.put('/post', postImage, async (req, res) => {   
  try {
    const {token} = req.cookies
    const {id, title, content, summary} = req.body
      jwt.verify(token, secret, {}, async (err, info) => {
        if (err) {
          return res.status(401).json('Unauthorized');
        }

      const postDoc = await Post.findById(id)
      const tilt = req.file ? req.file.path  : postDoc.file
      //if the user is not the owner of this post then return an unauthorized status code
      const Author = JSON.stringify(postDoc.author) === JSON.stringify(info.id)
      if (!Author) {
        return res.status(400).json('you are not the author')
      }
      await postDoc.updateOne({
        title,
        summary,
        content,
        file: tilt,
      })
      res.status(200).json('Post updated successfully');
      });
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }

});


app.get('/post/:id', async (req, res) => {
  const {id} = req.params
  const postDoc = await Post.findById(id)
  .populate('author', ['username'])
  res.json(postDoc)
})


app.listen (PORT, async ()=> {
  await mongoose
  console.log(`server listening on port ${PORT}`)
});