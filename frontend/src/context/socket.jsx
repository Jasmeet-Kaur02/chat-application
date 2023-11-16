import { createContext, useContext, useMemo } from "react";
import io from "socket.io-client";
import { API_URL } from "../constants";

const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const socket = useMemo(() => io.connect(API_URL), []);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
