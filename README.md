# Mini Social Post Application

A full-stack, responsive social media web application built with **React**, **Node.js**, **Express**, and **MongoDB**. Users can register, log in, create posts with images, like posts, write comments, and customize their profile.

---

## 🚀 Features

- **🔐 User Authentication**: Secure JWT-based authentication with encrypted passwords (bcryptjs).
- **📸 Post Creation & Image Uploads**: Share text posts and upload images powered by **Cloudinary**.
- **❤️ Like & Comment System**: Interact with posts in real-time by liking and commenting.
- **👤 User Profile Management**: Edit username and profile avatar.
- **🌙 Modern Dark Theme UI**: Styled with React Bootstrap and Material UI components tailored for dark mode.
- **📱 Fully Responsive Layout**: Mobile-friendly design with intuitive feed navigation.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 + Vite
- **UI & Styling**: React Bootstrap, Material UI (MUI), Custom CSS
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js (v5)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT) & bcryptjs
- **Media Storage**: Cloudinary & Multer

---

## 📂 Project Structure

```
Mini_Social_Post_Application/
├── Backend/
│   ├── config/          # Database & Cloudinary config
│   ├── controllers/     # Route logic (Auth, Posts, Comments)
│   ├── middleware/      # Auth & file upload middlewares
│   ├── models/          # Mongoose Schemas (User, Post)
│   ├── routes/          # API Route endpoints
│   ├── server.js        # Express application entry point
│   └── .env.example     # Backend environment template
│
└── Frontend/
    ├── src/
    │   ├── api/         # Axios instance setup
    │   ├── components/  # Navbar, PostCard, CommentSection, CreatePost
    │   ├── context/     # Auth Context Provider
    │   ├── pages/       # Feed, Login, Register, Profile
    │   ├── styles/      # Global dark theme styles
    │   └── theme.js     # MUI Theme configuration
    └── .env.example     # Frontend environment template
```

---

## ⚙️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster)
- [Cloudinary Account](https://cloudinary.com/) (For image uploads)

---

### 1. Backend Setup

1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `Backend` directory (refer to `.env.example`):
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. Start the backend development server:
   ```bash
   npm run dev
   ```
   The backend server will run on `http://localhost:5000`.

---

### 2. Frontend Setup

1. Open a new terminal and navigate to the `Frontend` directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `Frontend` directory:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:5173`.

---

## 📡 API Endpoints Summary

| Method | Endpoint               | Description                       | Auth Required |
| :----- | :--------------------- | :-------------------------------- | :-----------: |
| `POST` | `/api/auth/register`   | Register a new user account       |      ❌       |
| `POST` | `/api/auth/login`      | Log in and retrieve JWT token     |      ❌       |
| `GET`  | `/api/auth/me`         | Get current logged-in user profile|      YES      |
| `PUT`  | `/api/auth/profile`    | Update profile (Username/Avatar)  |      YES      |
| `GET`  | `/api/posts`           | Fetch post feed (Paginated)       |      YES      |
| `POST` | `/api/posts`           | Create a new post (Text/Image)    |      YES      |
| `DELETE`| `/api/posts/:id`      | Delete post (Owner only)          |      YES      |
| `POST` | `/api/posts/:id/like`  | Toggle like on a post             |      YES      |
| `POST` | `/api/posts/:id/comment`| Add a comment to a post           |      YES      |

---

## 📜 License

This project is open-source under the [MIT License](LICENSE).
