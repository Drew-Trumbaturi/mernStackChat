import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";
import { uniqBy } from "lodash";
import Users from "./Users";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";

export default function Messages() {
  const [Websocket, setWebSocket] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [offlinePeople, setOfflinePeople] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { username, id, setId, setUsername } = useContext(UserContext);
  const scrollDivRef = useRef();

  useEffect(() => {
    connectToWebSocket();
  }, []);

  function connectToWebSocket() {
    const ws = new WebSocket("ws://localhost:4040");
    setWebSocket(ws);

    ws.addEventListener("message", handleMessage);
    ws.addEventListener("close", () => {
      setTimeout(() => {
        console.log("Disconnected");
        connectToWebSocket();
      }, 1000);
    });
  }

  function showOnlinePeople(peopleArray) {
    const people = {};

    peopleArray.forEach(({ userId, username }) => {
      people[userId] = username;
    });
    setOnlinePeople(people);
  }

  function handleMessage(ev) {
    const messageData = JSON.parse(ev.data);
    if ("online" in messageData) {
      showOnlinePeople(messageData.online);
    } else if ("text" in messageData) {
      setMessages((prev) => [...prev, { ...messageData }]);
      console.log(selectedUser);
    }
  }

  function logout() {
    axios.post("/logout", {}).then(() => {
      setWebSocket(null);
      setId(null);
      setUsername(null);
    });
  }

  function sendMessage(ev) {
    ev.preventDefault();
    Websocket.send(
      JSON.stringify({
        recipient: selectedUser,
        text: newMessage,
      })
    );
    setNewMessage("");
    setMessages((prev) => [
      ...prev,
      {
        sender: id,
        recipient: selectedUser,
        _id: Date.now(),
        text: newMessage,
      },
    ]);
  }

  useEffect(() => {
    const div = scrollDivRef.current;
    if (div) {
      div.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  useEffect(() => {
    if (selectedUser) {
      axios.get("/messages/" + selectedUser).then((response) => {
        setMessages(response.data);
      });
    }
  }, [selectedUser]);

  useEffect(() => {
    axios.get("/people").then((response) => {
      const offlinePeopleArray = response.data
        .filter((p) => p._id !== id)
        .filter((p) => !Object.keys(onlinePeople).includes(p._id));
      const offlinePeople = {};
      offlinePeopleArray.forEach((p) => {
        offlinePeople[p._id] = p;
      });
      setOfflinePeople(offlinePeople);
    });
  }, [onlinePeople]);

  const loggedInUser = { ...onlinePeople };
  delete loggedInUser[id];

  const duplicateMessages = uniqBy(messages, "_id");

  return (
    <div className="flex h-screen">
      <div className="bg-slate-800 w-1/5 flex flex-col text-white">
        <div className="flex-grow overflow-y-auto overflow-x-hidden">
          <div className="font-bold flex gap-2 mb-4 text-gray-500 p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97.877.129 1.761.234 2.652.316V21a.75.75 0 001.28.53l4.184-4.183a.39.39 0 01.266-.112c2.006-.05 3.982-.22 5.922-.506 1.978-.29 3.348-2.023 3.348-3.97V6.741c0-1.947-1.37-3.68-3.348-3.97A49.145 49.145 0 0012 2.25zM8.25 8.625a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zm2.625 1.125a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
                clipRule="evenodd"
              />
            </svg>
            Hello World Chat{" "}
          </div>
          {Object.keys(loggedInUser).map((userId) => (
            <Users
              key={userId}
              id={userId}
              online={true}
              username={loggedInUser[userId]}
              onClick={() => setSelectedUser(userId)}
              selected={userId === selectedUser}
            />
          ))}
          {Object.keys(offlinePeople).map((userId) => (
            <Users
              key={userId}
              id={userId}
              online={false}
              username={offlinePeople[userId].username}
              onClick={() => setSelectedUser(userId)}
              selected={userId === selectedUser}
            />
          ))}
        </div>

        <div className="p-2 gap-1 grid justify-items-stretch">
          <hr />
          <div className="flex gap-2 items-center py-2 pl-1 ">
            <div className="btn-group dropdown">
              <button
                type="button"
                className="dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></button>
              <ul className="dropdown-menu p-2 bg-gray-400">
                <Link
                  to="/profile"
                  className="text-sm p-1 rounded-sm text-white hover:bg-gray-500 cursor-pointer"
                >
                  <a>Edit Profile</a>
                </Link>
                <li className="text-sm p-1 rounded-sm text-white hover:bg-gray-500 cursor-pointer">
                  <a>Lorem Ipsom</a>
                </li>
                <hr />
                <li className="text-sm p-1 rounded-sm text-white hover:bg-gray-500 cursor-pointer">
                  <a>Settings</a>
                </li>
              </ul>
            </div>
            <Avatar
              username={username}
              userId={id}
              online={true}
            />
            <span>{username}</span>
          </div>

          <button
            onClick={logout}
            className="text-sm text-gray-400 py-1 px-2 bg-gray-700 hover:bg-blue-500 rounded-lg"
          >
            logout
          </button>
        </div>
      </div>

      <div className="bg-gray-500 flex flex-col w-4/5 p-2">
        <div className="flex-grow">
          {!selectedUser && (
            <div className="text-gray-400 h-full flex items-center justify-center">
              Select a user to chat with
            </div>
          )}
          {!!selectedUser && (
            <div className="relative h-full">
              <div className="overflow-auto px-2 absolute inset-0">
                {duplicateMessages.map((message) => (
                  <div
                    key={message._id}
                    className={
                      message.sender === id ? "text-right" : "text-left"
                    }
                  >
                    <div
                      className={
                        "inline-block p-2 my-2 rounded-md " +
                        (message.sender === id
                          ? "bg-green-500 text-white"
                          : "bg-blue-500 text-white")
                      }
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                <div ref={scrollDivRef}></div>
              </div>
            </div>
          )}
        </div>
        {!!selectedUser && (
          <form
            className="flex gap-1"
            onSubmit={sendMessage}
          >
            <input
              type="text"
              value={newMessage}
              onChange={(ev) => setNewMessage(ev.target.value)}
              placeholder="Type your message here"
              className="bg-white flex-grow rounded-md border p-2"
            />
            <button
              type="submit"
              className="bg-blue-500 flex w-20 rounded-md p-2 hover:bg-blue-400"
            >
              Send
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 22"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-20 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
