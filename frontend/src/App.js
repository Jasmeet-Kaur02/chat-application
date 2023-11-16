import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./context/userContext";
import { RoomsContextProvider } from "./context/roomsContext";
import { SocketContextProvider } from "./context/socket";
import { AppRoutes } from "./routes";
import "./index.css";

function App() {
  return (
    <UserContextProvider>
      <RoomsContextProvider>
        <SocketContextProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </SocketContextProvider>
      </RoomsContextProvider>
    </UserContextProvider>
  );
}

export default App;
