import { useUser } from "../../../context/userContext";
import "./index.css";

const formatUsers = (users) => {
  return [
    ...users.filter((user) => user.isActive === true),
    ...users.filter((user) => user.isActive === false),
  ];
};

const Sidebar = ({ roomName, users, onLogout, onLeave }) => {
  const [loggedInUser] = useUser();

  return (
    <div className="sidebar">
      <div>
        <h2>{roomName}</h2>
        <ul>
          {formatUsers(users).map((user) => (
            <li key={user.id}>
              {`${
                loggedInUser.fullName === user.fullName ? "You" : user.fullName
              }`}

              <span
                className={`${user.isActive ? "active-user" : "deactive-user"}`}
              ></span>
            </li>
          ))}
        </ul>
      </div>
      <div className="btn-wrapper">
        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
        <button onClick={onLeave} className="leave-btn">
          Leave Room
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
