const { readUserRooms, readRooms } = require("../helpers");

const getRooms = async (req, res) => {
  const userId = req.id;

  await readUserRooms()
    .then(async (userRooms) => {
      await readRooms()
        .then((rooms) => {
          const parsedUserRooms = JSON.parse(userRooms);
          const parsedRooms = JSON.parse(rooms);
          let joinedRooms = [];
          let unjoinedRooms = parsedRooms;
          if (parsedUserRooms.hasOwnProperty(userId)) {
            joinedRooms = parsedUserRooms[userId];
            unjoinedRooms = parsedRooms.filter((room) =>
              parsedUserRooms[userId].every(
                (userRoom) => userRoom.id !== room.id
              )
            );
          }
          return res.status(200).json({
            status: true,
            message: "All rooms have been fetched successfully",
            data: {
              joinedRooms: joinedRooms,
              unjoinedRooms: unjoinedRooms,
            },
          });
        })
        .catch((err) => {
          return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            data: null,
          });
        });
    })
    .catch(() => {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
        data: null,
      });
    });
};

module.exports = {
  getRooms,
};
