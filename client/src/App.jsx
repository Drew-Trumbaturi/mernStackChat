import axios from "axios";
import { UserContextProvider } from "./UserContext";
import MyRoutes from "./Routes";
import { Route, Routes } from "react-router-dom";
import UserProfile from "./UserProfile";

function App() {
  axios.defaults.baseURL = "http://localhost:4040";
  axios.defaults.withCredentials = true;

  return (
    <UserContextProvider>
      <Routes>
        <Route
          exact
          path="/"
          element={<MyRoutes />}
        />
        <Route
          path="/profile"
          element={<UserProfile />}
        />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
