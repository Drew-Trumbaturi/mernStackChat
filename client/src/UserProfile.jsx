import Avatar from "./Avatar";
import React, { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";

export default function UserProfile() {
  const { username, id, setId, setUsername } = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Show password toggler handler
  const toggleShown = () => {
    // Change state of password boolean
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-slate-800 ">
      {/* <button
        type="button"
        className="bg-gray-400 my-4 rounded-r-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="42"
          height="42"
          fill="currentColor"
          class="bi bi-chevron-double-left"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
          />
          <path
            fill-rule="evenodd"
            d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
          />
        </svg>
      </button> */}
      <div className="Auth-form-container h-screen flex flex-col place-content-center items-center">
        <form className="Signup-form">
          <div className="Signup-form-content">
            <h3 className="Auth-form-title">Edit User Profile</h3>

            <div className="items-center flex place-content-center ">
              {/* <Avatar
                username={username}
                userId={id}
                online={true}
              /> */}
            </div>

            <div className="row">
              <div className="col-sm form-group mt-3">
                <input
                  value={firstName}
                  type="text"
                  onChange={(ev) => setFirstName(ev.target.value)}
                  className="form-control mt-1"
                  placeholder="First Name"
                />
              </div>
              <div className="col-sm form-group mt-3">
                <input
                  value={lastName}
                  type="text"
                  onChange={(ev) => setLastName(ev.target.value)}
                  className="form-control mt-1"
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className="form-group mt-3">
              <input
                value={username}
                type="text"
                onChange={(ev) => setUsername(ev.target.value)}
                className="form-control mt-1"
                placeholder="Username"
              />
            </div>

            <div className="form-group mt-3">
              <input
                value={email}
                type="text"
                onChange={(ev) => setEmail(ev.target.value)}
                className="form-control mt-1"
                placeholder="Email Address"
              />
            </div>

            <div className="form-group mt-3">
              <div
                className="input-group"
                role="group"
              >
                <input
                  value={password}
                  type={showPassword ? "text" : "password"}
                  onChange={(ev) => setPassword(ev.target.value)}
                  className="form-control"
                  placeholder="Enter password"
                />
                <div className="input-group-text bg-blue-300">
                  <button
                    type="button"
                    className="bg-blue-300"
                    onClick={toggleShown}
                  >
                    {showPassword === false ? (
                      <i className="bi bi-eye"></i>
                    ) : (
                      <i className="bi bi-eye-slash"></i>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-2 my-3 mt-4">
              <Link
                to={"/"}
                className="bg-blue-300 text-white block w-full rounded-md p-2"
              >
                <button
                  type="submit"
                  className="block w-full"
                >
                  Cancel
                </button>
              </Link>
              <button
                type="submit"
                className="bg-blue-500 text-white block w-full rounded-md p-2"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
