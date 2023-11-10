import "./index.css";
import moment from "moment";

const Message = ({ userName, message, time }) => {
  return (
    <div className="message">
      <div>
        <p>{userName}</p>
        <p>{`${moment(time).format("HH:MM")}`}</p>
      </div>
      <div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Message;
