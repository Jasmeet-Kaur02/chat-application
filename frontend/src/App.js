import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./context/userContext";
import { RoomsContextProvider } from "./context/roomsContext";
import { AppRoutes } from "./routes";
import "./index.css";

function App() {
  return (
    <UserContextProvider>
      <RoomsContextProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </RoomsContextProvider>
    </UserContextProvider>
  );
}

export default App;
