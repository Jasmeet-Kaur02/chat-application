import Sidebar from "../../components/chat/sidebar";
import Message from "../../components/chat/message";
import ChatInput from "../../components/chat/input";
import { localStorageKeys } from "../../constants";
import "./index.css";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSocket } from "../../context/socket";
import { useUser } from "../../context/userContext";

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [user, setUser] = useUser();
  const socket = useSocket();

  const room = useMemo(() => state.room, [state]);

  const onLogout = useCallback(() => {
    socket.emit("logout", { user, room });
    localStorage.removeItem(localStorageKeys.loggedInUserToken);
    setUser(null);
    navigate("/signin");
  }, [socket]);

  const onLeave = useCallback(() => {
    socket.emit("leaveRoom", { user, room });
    localStorage.removeItem(localStorageKeys.loggedInUserToken);
    setUser(null);
    navigate("/signin");
  }, [socket]);

  const sendMessage = useCallback(
    (message) => {
      socket.emit("message", { user, room, message });
    },
    [socket]
  );

  useEffect(() => {
    socket.on("roomUsers", (users) => {
      setUsers(users);
    });
    socket.on("message", (chat) => {
      setChats((prev) => [...prev, chat]);
    });
  }, [socket]);

  return (
    <div className="chat-screen-wrapper">
      <Sidebar
        roomName={room.name}
        onLeave={onLeave}
        onLogout={onLogout}
        users={users}
      />
      <div className="chat-window">
        <div className="message-wrapper">
          {chats.map((chat) => (
            <Message
              message={chat.message}
              userName={chat.userName}
              time={chat.time}
            />
          ))}
        </div>
        <ChatInput onSendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default Chat;
