import axios from "axios";
import { useCallback, useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

type isLoginOrRegisterType = "register" | "login";

const RegisterAndLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginOrRegister, setIsLoginOrRegister] =
    useState<isLoginOrRegisterType>("register");
  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);

  const isRegister = isLoginOrRegister === "register";

  const onChangeUserName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value),
    []
  );

  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
    []
  );

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { data } = await axios.post("/register", { username, password });
      setLoggedInUsername(username);
      setId(data.id);
    },
    [password, setId, setLoggedInUsername, username]
  );

  const onChangeLoginAndRegisterState = useCallback(
    (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (isLoginOrRegister === "register") {
        setIsLoginOrRegister("login");
      } else {
        setIsLoginOrRegister("register");
      }

      setUsername("");
      setPassword("");
    },
    [isLoginOrRegister]
  );

  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form className="w-64 mx-auto mb-12" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={onChangeUserName}
          className="block w-full rounded-sm p-2 mb-2 border"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={onChangePassword}
          className="block w-full rounded-sm p-2 mb-2 border"
        />
        <button className="bg-blue-500 text-white block w-full rounded-sm p-2 mb-2">
          {isRegister ? "Register" : "Login"}
        </button>
        <div>
          {isRegister ? "Already a member?" : "Don`t have an account?"}{" "}
          <button
            className="text-blue-900"
            onClick={onChangeLoginAndRegisterState}
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterAndLogin;
