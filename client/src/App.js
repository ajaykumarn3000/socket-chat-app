import { useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./Chat.js";

const socket = io.connect("http://localhost:4000/");


function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("JOIN_ROOM", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {showChat ? (
        <Chat socket={socket} username={username} room={room} />
      ) : (
        <div className="joinChatContainer">
          <h3>Join a Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Room Id..."
            onChange={(e) => setRoom(e.target.value)}
          ></input>
          <button onClick={joinRoom}>Join a room</button>
        </div>
      )}
    </div>
  );
}

export default App;