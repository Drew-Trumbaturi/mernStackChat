import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

export default function SignUpOrLogin() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let [authMode, setAuthMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);

  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);

  async function handleSubmit(ev) {
    ev.preventDefault();
    //this is a test for github

    const signupData = { firstName, lastName, username, email, password };
    const loginData = { username, password };
    const url = authMode === "login" ? "login" : "signup";
    const { data } = await axios.post(
      url,
      url === "login" ? loginData : signupData
    );
    setLoggedInUsername(username);
    setId(data.id);
  }

  // Show password toggler handler
  const toggleShown = () => {
    // Change state of password boolean
    setShowPassword(!showPassword);
  };

  // Login toggler handler
  const changeAuthMode = () => {
    setAuthMode(authMode === "signup" ? "login" : "signup");
  };

  if (authMode === "login") {
    return (
      <div className="Auth-form-container bg-slate-800 h-screen flex flex-col place-content-center items-center">
        <form
          className="Auth-form  m-3 mt-4"
          onSubmit={handleSubmit}
        >
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <a
                className="link-primary"
                onClick={changeAuthMode}
              >
                Sign Up
              </a>
            </div>

            <div className="form-group mt-3">
              <input
                value={username}
                type="text"
                onChange={(ev) => setUsername(ev.target.value)}
                className="form-control mt-1 block w-full rounded-md p-2 mb-2 border"
                placeholder="Username"
              />
            </div>

            <div>
              <div
                className="input-group"
                role="group"
              >
                <input
                  value={password}
                  type={showPassword ? "text" : "password"}
                  onChange={(ev) => setPassword(ev.target.value)}
                  className="form-control"
                  placeholder="Password"
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

            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="bg-blue-500 text-white block w-full rounded-md p-2"
              >
                Login
              </button>
            </div>
            <p className="text-right mt-2">
              Forgot
              <a
                href="#forgotpassword"
                className="link-primary"
              >
                {" "}
                password?
              </a>
            </p>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="Signup-form-container bg-slate-800 h-screen flex items-center">
      <form
        className="Signup-form"
        onSubmit={handleSubmit}
      >
        <div className="Signup-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <a
              className="link-primary"
              onClick={changeAuthMode}
            >
              Sign In
            </a>
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

          <div className="d-grid gap-2 my-3 mt-4">
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
  );
}
