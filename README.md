
# **Authen-App Server** - section

**Authen-App** is a lightweight backend service built primarily for authentication, providing secure **Sign Up** and **Sign In** functionalities.  
The project emphasizes **backend logic** over frontend design, making it ideal for integration with any web or mobile interface.

---

## ⚡ Features
- **User Registration (Sign Up)** with password hashing.
- **User Authentication (Sign In)** with secure password verification.
- **Data Protection** using `bcryptjs` for hashing.
- **Cross-Origin Resource Sharing (CORS)** support.
- Modular backend structure for scalability.

---

## 🛠 Tech Stack
| Technology | Purpose |
|------------|---------|
| Express.js | Backend framework |
| bcryptjs | Password hashing and verification |
| CORS | Cross-origin requests |
| JSON Web Token (JWT) | Secure token-based authentication |
| Node.js | Runtime environment |
| MongoDB | User database |

---

## 📂 Project Structure
```
server/
│
├── index.js
├── routes/
│   └── auth.js
├── controllers/
│   └── authController.js
├── models/
│   └── userModel.js
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1️⃣ Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB

### 2️⃣ Installation
```
git clone https://github.com/your-username/authen-app.git
cd authen-app
npm install
```

### 3️⃣ Environment Variables
Create `.env` with:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4️⃣ Run the App
```
npm run dev   # development
npm start     # production
```

---

## 📌 API Endpoints

### 🔹 Sign Up
**Endpoint:** `POST /api/auth/signup`  
**Description:** Registers a new user with hashed password.

**Request:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Sample Code (Controller):**
```javascript
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // check if user exists
    let existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

---

### 🔹 Sign In
**Endpoint:** `POST /api/auth/signin`  
**Description:** Authenticates a user and returns a JWT token.

**Request:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Sample Code (Controller):**
```javaScript
exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // find user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

---

## 🔐 Security Practices
- Password hashing with `bcryptjs`.
- JWT for stateless authentication.
- No plain-text password storage.
- CORS enabled for frontend-backend communication.

---
🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀

***
# **Authen-App Client** - section

The **Authen-App Client** is the frontend part of the Authen-App project.  
It provides a simple and responsive interface for user authentication, including **Sign Up** and **Sign In** functionalities, and connects to the backend API for processing requests.

---

## ⚡ Features
- **User Registration (Sign Up)** form with input validation.
- **User Login (Sign In)** form with JWT token handling.
- Integration with the **Authen-App** backend API.
- Storage of authentication tokens in **localStorage** or **sessionStorage**.
- Responsive design for desktop and mobile.
- Easy-to-customize UI components.

---

## 🛠 Tech Stack
| Technology | Purpose |
|------------|---------|
| React.js (or Vite) | Frontend UI framework |
| Axios / Fetch API | HTTP requests to backend |
| React Router DOM | Navigation between routes |
| CSS / Tailwind / Bootstrap | Styling |
| JavaScript (ES6+) | App logic |

---

## 📂 Project Structure
```
client/
│
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── SignupForm.jsx
│   │   ├── SigninForm.jsx
│   │   └── Navbar.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Signup.jsx
│   │   └── Signin.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── api.js
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1️⃣ Prerequisites
- Node.js v14+
- npm or yarn
- The Authen-App backend server running

### 2️⃣ Installation
```
# Go to client folder
cd client

# Install dependencies
npm install
```

### 3️⃣ Environment Variables
Create a `.env` file in `client/`:
```
VITE_API_BASE_URL=http://localhost:5000/api
```
Replace with your backend URL in production.

### 4️⃣ Run Development Server
```
npm run dev      # For Vite
# or
npm start        # For Create React App
```

---

## 📌 API Communication

All requests are sent to the backend’s API base URL via Axios or Fetch.

**Example: `src/api.js`**
```javaScript
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const signup = (data) => axios.post(`${API_BASE}/auth/signup`, data);
export const signin = (data) => axios.post(`${API_BASE}/auth/signin`, data);
export const getProfile = (token) =>
  axios.get(`${API_BASE}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
```

---

## 🎨 Example Component — Sign Up Form
```javaScript
import { useState } from "react";
import { signup } from "../api";

export default function SignupForm() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(form);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    
       setForm({ ...form, username: e.target.value })} />
       setForm({ ...form, email: e.target.value })} />
       setForm({ ...form, password: e.target.value })} />
      Sign Up
      {message && {message}}
    
  );
}
```

---

## 🔐 Best Practices
- Store the JWT securely (prefer HTTP-only cookies in production).
- Perform frontend validation but always validate again on backend.
- Use HTTPS in production.


---

## 📜 License
MIT License

---

## 📧 Contact
**Author:** Santos Murmu   
**GitHub:** [realsantosm](https://github.com/your-username)


## **💐**
  

