import "./index.css";
import moment from "moment";
import { useUser } from "../../../context/userContext";

const Message = ({ userName, message, time }) => {
  const [user] = useUser();

  return (
    <div className="message">
      <div
        className={`message-details ${
          user.fullName === userName && "self-message"
        } 
      `}
      >
        <div>
          <p>{user.fullName === userName ? "You" : userName}</p>
          <p>{`${moment(time).format("HH:MM")}`}</p>
        </div>
        <div>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
