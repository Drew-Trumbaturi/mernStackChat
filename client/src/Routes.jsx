import SignUpOrLogin from "./SignUpOrLogin";
import Messages from "./Messages";
import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function Routes() {
  const { username, id } = useContext(UserContext);

  if (username) {
    return <Messages />;
  }

  if (!username) {
    return <SignUpOrLogin />;
  }
}
