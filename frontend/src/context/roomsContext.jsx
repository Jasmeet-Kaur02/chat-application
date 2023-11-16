import { useEffect } from "react";
import { createContext, useState, useContext } from "react";
import { getRooms } from "../api/rooms";
import { useUser } from "./userContext";

const RoomsContext = createContext([]);

export const RoomsContextProvider = ({ children }) => {
  const [joinedRooms, setJoinedRooms] = useState([]);
  const [unjoinedRooms, setUnjoinedRooms] = useState([]);
  const [user] = useUser();

  const fetchRooms = async () => {
    await getRooms(user.id)
      .then((res) => {
        if (res.status) {
          setJoinedRooms(res.data.joinedRooms);
          setUnjoinedRooms(res.data.unjoinedRooms);
        }
      })
      .catch(() => console.log("Error while fetching rooms"));
  };

  useEffect(() => {
    if (user) {
      fetchRooms();
    }
  }, [user]);

  return (
    <RoomsContext.Provider value={{ joinedRooms, unjoinedRooms }}>
      {children}
    </RoomsContext.Provider>
  );
};

export const useRooms = () => {
  return useContext(RoomsContext);
};
