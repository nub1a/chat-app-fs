import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";

interface UserContextType {
  username: string | null;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  id: string | null;
  setId: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext<UserContextType>({
  username: null,
  setUsername: () => null,
  id: null,
  setId: () => null,
});

export const UserContextProvider = ({ children }: React.PropsWithChildren) => {
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");

  const checkUser = useCallback(async () => {
    const { data } = await axios.get("/profile");
    setId(data.userId);
    setUsername(data.username);
  }, []);

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <UserContext.Provider value={{ username, id, setUsername, setId }}>
      {children}
    </UserContext.Provider>
  );
};
