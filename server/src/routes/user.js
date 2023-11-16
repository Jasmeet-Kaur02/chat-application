const router = require("express").Router();
const { getRooms } = require("../controllers/RoomController");

router.get("/rooms", getRooms);

module.exports = router;
