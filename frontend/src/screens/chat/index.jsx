import Sidebar from "../../components/chat/sidebar";
import Message from "../../components/chat/message";
import ChatInput from "../../components/chat/input";
import "./index.css";
import { useState } from "react";

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);
  return (
    <div className="chat-screen-wrapper">
      <Sidebar roomName="Tech Talk" users={users} />
      <div className="chat-window">
        <div className="message-wrapper">
          {chats.map((chat) => (
            <Message
              message={chat.message}
              userName={chat.user.name}
              time={chat.time}
            />
          ))}
        </div>
        <ChatInput />
      </div>
    </div>
  );
};

export default Chat;
