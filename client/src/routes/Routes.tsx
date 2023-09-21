import { useContext } from "react";
import RegisterAndLogin from "../screens/RegisterAndLogin";
import { UserContext } from "../context/UserContext";

export const Routes = () => {
  const { username, id } = useContext(UserContext);

  if (username && id) {
    return `logged in as ${username} with id ${id}`;
  }
  return <RegisterAndLogin />;
};
