import "./index.css";

const Sidebar = ({ roomName, users }) => {
  return (
    <div className="sidebar">
      <h2>{roomName}</h2>
      <ul>
        {users.map((user) => (
          <li>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
