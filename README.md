# MiniBlog

Welcome to MiniBlog, a simple blog platform built with the MERN stack (MongoDB, Express.js, React, and Node.js). This project allows users to create, view, and edit blog posts.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
  
## Features

- **User Authentication:** Users can register, log in, and log out securely.
- **Create and Edit Posts:** Authenticated users can create new blog posts and edit their existing posts.
- **Rich Text Editing:** Integration with ReactQuill allows users to create posts with rich text formatting.
- **Image Upload:** Users can upload images along with their blog posts.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- MongoDB installed locally or accessible remotely
- [Backend](/api) server running

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/LordYemight/Mini-Blog-APP
   ```

2. Install dependencies:

   ```bash
   cd mini-blog
   npm install
   ```

3. Run the frontend:

   ```bash
   npm start
   ```

## Project Structure

The project structure is organized as follows:

- **api:** Contains the Node.js backend code.
- **client:** Houses the React frontend code.
- **design:** Stores the CSS styles for the application.

## Technologies Used

- **Frontend:** React, ReactQuill, Axios
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JSON Web Tokens (JWT)
- **Image Upload:** Multer

## API Endpoints

- **POST /register:** User registration.
- **POST /login:** User login.
- **POST /logout:** User logout.
- **GET /profile:** Retrieve user profile information.
- **GET /post:** Retrieve a list of blog posts.
- **POST /post:** Create a new blog post.
- **PUT /post:** Update an existing blog post.
- **GET /post/:id:** Retrieve a specific blog post by ID.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

