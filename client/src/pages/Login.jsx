import React, {useState} from 'react'
import axios from "axios";


const LogIn = () => {
let {serverUrl} = React.useContext(dataContext);

  // const [firstName, setFirstName] = useState(null);
  // const [lastName, setLastName] = useState(null);
  // const [userName, setUserName] = useState(null);
  const [emailName, setEmail] = useState(null);
  const [passwordName, setPassword] = useState(null);


  // const [avatar, setAvatar] = useState(null);
  // const [previewUrl, setPreviewUrl] = useState(null);

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setAvatar(file);
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPreviewUrl(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    try {
      let data = await axios.post(serverUrl + "/api/login", {
        emailName,
        passwordName,
      },{withCredentials: true});

      console.log(data);      
      
    } catch(err) {
      console.error("Internal Error during sign up:", err);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-gradient-to-br from-gray-900 to-black flex justify-center items-center p-4">
      <div className="w-[90%] max-w-[400px] bg-[#322e2e] rounded-2xl p-8 shadow-2xl">
        <h1 className="text-white text-2xl font-bold text-center mb-8">
          LogIn
        </h1>

        <form
          onSubmit={handleSubmit}
          className="w-full space-y-4 flex flex-col items-center justify-center"
        >
          {/* <div className="grid grid-cols-2 gap-4 w-full">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) =>
                setFirstName(e.target.value)
              }
              className="w-full px-4 py-3 bg-[#2d2d2d] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) =>
                setLastName(e.target.value)
              }
              className="w-full px-4 py-3 bg-[#2d2d2d] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}

          {/* <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) =>
              setUserName(e.target.value)
            }
            className="w-full px-4 py-3 bg-[#2d2d2d] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> */}

          <input
            type="email"
            placeholder="Email"
            value={emailName}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full px-4 py-3 bg-[#2d2d2d] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={passwordName}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full px-4 py-3 bg-[#2d2d2d] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 rounded-lg text-white font-semibold hover:bg-blue-600 transition-colors"
          >
            Login
          </button>

          <p className="text-center text-gray-400 text-sm mt-4">
            Does not have an account?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Create Account
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LogIn