import React, { useState } from "react";
import { dataContext } from "../context/UserContext";
import axios from "axios";
import { Link } from "react-router-dom";

function SignUp() {
  let { serverUrl } = React.useContext(dataContext);

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [userName, setUserName] = useState(null);
  const [emailName, setEmail] = useState(null);
  const [passwordName, setPassword] = useState(null);

  const [avatar, setAvatar] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    try {
      let data = await axios.post(
        serverUrl + "/api/signup",
        {
          firstName,
          lastName,
          userName,
          emailName,
          passwordName,
          avatar,
        },
        { withCredentials: true }
      );

      console.log(data);
    } catch (err) {
      console.error("Internal Error during sign up:", err);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-gradient-to-br from-gray-900 to-black flex justify-center items-center p-4">
      <div className="w-[90%] max-w-[400px] bg-[#322e2e] rounded-2xl p-8 shadow-2xl">
        <h1 className="text-white text-2xl font-bold text-center mb-8">
          Sign Up
        </h1>

        <form
          onSubmit={handleSubmit}
          className="w-full space-y-4 flex flex-col items-center justify-center"
        >
          {/* Avatar Upload Section */}
          <div className="relative w-24 h-24 mb-4">
            <div className="w-full h-full rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border-2 border-blue-500">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              )}
            </div>
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors"
            >
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                value={avatar}
                onChange={handleImageChange}
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-3 bg-[#2d2d2d] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-3 bg-[#2d2d2d] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-4 py-3 bg-[#2d2d2d] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            placeholder="Email"
            value={emailName}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-[#2d2d2d] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={passwordName}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-[#2d2d2d] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 rounded-lg text-white font-semibold hover:bg-blue-600 transition-colors"
          >
            Create Account
          </button>

          <p className="text-center text-gray-400 text-sm mt-4">
            Already have an account?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Sign In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
