import { useRooms } from "../../context/roomsContext";
import { useState } from "react";
import "./index.css";

const Rooms = () => {
  const [selectedRoom, setSelectedRoom] = useState();
  const { activeUserRooms, rooms } = useRooms();

  return (
    <div className="screen-wrapper">
      <form>
        <label className="select-room-label">Rejoin your room</label>
        <select
          placeholder="Select room"
          onChange={(e) => setSelectedRoom(e.target.value)}
        >
          {activeUserRooms.map((room) => (
            <option>{room.name}</option>
          ))}
        </select>
        <span className="divider">
          <div />
          <p className="">OR</p>
          <div />
        </span>
        <label className="select-room-label">Join a new room</label>
        <select
          placeholder="Select room"
          onChange={(e) => setSelectedRoom(e.target.value)}
        >
          {rooms.map((room) => (
            <option>{room.name}</option>
          ))}
        </select>

        <div className="btn-wrapper">
          <button class="submit-btn">Join Room</button>
        </div>
      </form>
    </div>
  );
};

export default Rooms;
