const fs = require("fs/promises");
const moment = require("moment");

const userRoomsFilePath = `${__dirname}/data/userRooms.json`;
const usersFilePath = `${__dirname}/data/users.json`;
const roomsFilePath = `${__dirname}/data/rooms.json`;
const roomsDetailsFilePath = `${__dirname}/data/roomsDetails.json`;

const addUsers = (users) => {
  return fs.writeFile(usersFilePath, JSON.stringify(users), {
    encoding: "utf-8",
    flag: "w",
  });
};

const readUserRooms = () => {
  return fs.readFile(userRoomsFilePath, { encoding: "utf-8" });
};

const addUserRooms = (data) => {
  return fs.writeFile(userRoomsFilePath, JSON.stringify(data), {
    encoding: "utf-8",
  });
};

const readRoomsDetails = () => {
  return fs.readFile(roomsDetailsFilePath, {
    encoding: "utf-8",
  });
};

const addRoomsDetails = (data) => {
  return fs.writeFile(roomsDetailsFilePath, JSON.stringify(data), {
    encoding: "utf-8",
  });
};

const readRooms = () => {
  return fs.readFile(roomsFilePath, { encoding: "utf-8" });
};

const formatMessage = (userName, message) => {
  return {
    userName,
    message,
    time: moment(new Date()),
  };
};

module.exports = {
  addUsers,
  readUserRooms,
  readRooms,
  addUserRooms,
  addRoomsDetails,
  readRoomsDetails,
  formatMessage,
};
