import axios from "axios";
import { UserContextProvider } from "./context/UserContext";
import { Routes } from "./routes/Routes";

axios.defaults.baseURL = "http://localhost:4040";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  );
}

export default App;
