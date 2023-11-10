import { useEffect } from "react";
import { createContext, useState, useContext } from "react";
import { getRooms } from "../api/rooms";
import { useUser } from "./userContext";

const RoomsContext = createContext([]);

const existingRooms = [
  "Foodies Corner",
  "Tech Talk",
  "Music Lovers",
  "Book Club",
  "Gaming Zone",
  "Fashion Trends",
  "Fitness Fanatics",
  "Travel Enthusiasts",
  "Motivation and Inspiration",
];

export const RoomsContextProvider = ({ children }) => {
  const [activeUserRooms, setActiveUserRooms] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [user] = useUser();

  // const fetchRooms = async () => {
  //   await getRooms(user?.id)
  //     .then((res) => {
  //       if (res.status) {
  //         setActiveUserRooms(res.data.userRooms);
  //         setRooms(res.data.rooms);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };

  // useEffect(() => {
  //   fetchRooms();
  // }, []);

  return (
    <RoomsContext.Provider value={{ activeUserRooms, rooms }}>
      {children}
    </RoomsContext.Provider>
  );
};

export const useRooms = () => {
  return useContext(RoomsContext);
};
