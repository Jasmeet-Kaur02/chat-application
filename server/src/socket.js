const {
  readUserRooms,
  addRoomsDetails,
  addUserRooms,
  readRoomsDetails,
  formatMessage,
} = require("./helpers");

const joinNewRoom = async ({ user, room }, io, socket) => {
  socket.join(room.id);

  await readUserRooms()
    .then(async (userRooms) => {
      const parsedUserRooms = JSON.parse(userRooms);
      if (parsedUserRooms.hasOwnProperty(user.id)) {
        parsedUserRooms[user.id].push(room);
      } else {
        parsedUserRooms[user.id] = [room];
      }
      await addUserRooms(parsedUserRooms);

      await readRoomsDetails()
        .then(async (roomsDetails) => {
          const parsedRoomsDetails = JSON.parse(roomsDetails);
          parsedRoomsDetails[room.id].users.push({ ...user, isActive: true });
          await addRoomsDetails(parsedRoomsDetails);
          socket.broadcast
            .to(room.id)
            .emit(
              "message",
              formatMessage("ChitChat", `${user.fullName} has joined a room`)
            );
          io.to(room.id).emit("roomUsers", parsedRoomsDetails[room.id].users);
        })
        .catch(() => {
          console.log("Error while getting rooms details");
        });
    })
    .catch(() => {
      console.log("Error while getting user rooms");
    });
};

const existingRoomHandler = async ({ user, room }, io, socket, actionType) => {
  socket.join(room.id);

  await readRoomsDetails()
    .then(async (roomDetails) => {
      const parsedRoomDetails = JSON.parse(roomDetails);
      const roomDetail = parsedRoomDetails[room.id];
      const userIndex = roomDetail.users.findIndex(
        (roomUser) => roomUser.id === user.id
      );

      parsedRoomDetails[room.id].users[userIndex] = {
        ...roomDetail.users[userIndex],
        isActive: actionType === "enter" ? true : false,
      };
      await addRoomsDetails(parsedRoomDetails);
      io.to(room.id).emit("roomUsers", parsedRoomDetails[room.id].users);
    })
    .catch(() => {
      console.log("Error while getting rooms details");
    });
};

const sendMessage = async ({ user, room, message }, io, socket) => {
  io.to(room.id).emit("message", formatMessage(user.fullName, message));
};

const leaveRoom = async ({ user, room }, io, socket) => {
  await readUserRooms()
    .then(async (userRooms) => {
      const parsedUserRooms = JSON.parse(userRooms);
      parsedUserRooms[user.id] = parsedUserRooms[user.id].filter(
        (userRoom) => userRoom.id !== room.id
      );

      await addUserRooms(parsedUserRooms);

      await readRoomsDetails()
        .then(async (roomsDetails) => {
          const parsedRoomsDetails = JSON.parse(roomsDetails);
          parsedRoomsDetails[room.id].users = parsedRoomsDetails[
            room.id
          ].users.filter((roomUser) => roomUser.id !== user.id);

          await addRoomsDetails(parsedRoomsDetails);
          socket.broadcast
            .to(room.id)
            .emit(
              "message",
              formatMessage("ChitChat", `${user.fullName} has left a room`)
            );
          io.to(room.id).emit("roomUsers", parsedRoomsDetails[room.id].users);
        })
        .catch((err) => {
          console.log("Error while getting rooms details");
        });
    })
    .catch((err) => {
      console.log("Error while getting user rooms");
    });
};

module.exports = {
  joinNewRoom,
  existingRoomHandler,
  leaveRoom,
  sendMessage,
};
