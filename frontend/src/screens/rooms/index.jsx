import { useRooms } from "../../context/roomsContext";
import { useState } from "react";
import "./index.css";
import { useUser } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../context/socket";

const Rooms = () => {
  const [selectedRoom, setSelectedRoom] = useState();
  const [roomType, setRoomType] = useState("");
  const { joinedRooms, unjoinedRooms } = useRooms();
  const [user] = useUser();
  const navigate = useNavigate();
  const socket = useSocket();

  const onSelectRoom = (type, roomName) => {
    let room = null;
    if (type === "newRoom") {
      room = unjoinedRooms.filter((room) => room.name === roomName)[0];
    } else {
      room = joinedRooms.filter((room) => room.name === roomName)[0];
    }
    setSelectedRoom(room);
    setRoomType(type);
  };

  const onJoinRoom = async (e) => {
    e.preventDefault();
    const socketName =
      roomType === "existingRoom" ? "joinExistingRoom" : "joinNewRoom";
    if (selectedRoom) {
      await socket.emit(socketName, { user, room: selectedRoom });
    }
    navigate("/", {
      state: {
        room: selectedRoom,
      },
    });
  };

  return (
    <div className="screen-wrapper">
      <form onSubmit={onJoinRoom}>
        {joinedRooms.length ? (
          <>
            <label className="select-room-label">Rejoin your room</label>
            <select
              placeholder="Select room"
              onChange={(e) => onSelectRoom("existingRoom", e.target.value)}
            >
              <option value="none" selected disabled hidden>
                Select Room
              </option>
              {joinedRooms.map((room) => (
                <option>{room.name}</option>
              ))}
            </select>
          </>
        ) : null}
        {joinedRooms.length && unjoinedRooms.length ? (
          <span className="divider">
            <div />
            <p className="">OR</p>
            <div />
          </span>
        ) : null}
        {unjoinedRooms.length ? (
          <>
            <label className="select-room-label">Join a new room</label>
            <select
              placeholder="Select room"
              onChange={(e) => onSelectRoom("newRoom", e.target.value)}
            >
              <option value="none" selected disabled hidden>
                Select Room
              </option>
              {unjoinedRooms.map((room) => (
                <option>{room.name}</option>
              ))}
            </select>
          </>
        ) : null}
        <div className="btn-wrapper">
          <button type="submit" class="submit-btn">
            Join Room
          </button>
        </div>
      </form>
    </div>
  );
};

export default Rooms;
