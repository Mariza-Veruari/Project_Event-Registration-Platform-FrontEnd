import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const SessionContext = createContext({
  user: null,
  accessToken: "",
  setSessionUser: () => Function,
  setSessionToken: () => Function,
  logout: () => Function,
});

export const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lsUser = JSON.parse(localStorage.getItem("user"));
    const lsAccessToken = localStorage.getItem("access_token");

    axios.defaults.baseURL = `http://localhost:3000`;
    axios.interceptors.request.use((request) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        request.headers["Authorization"] = `Bearer ${token}`;
      }
      return request;
    });
    axios.interceptors.response.use(null, (error) => {
      if (error.response && error.response.status === 401) {
        logout();
      }
      if (error.response.data.message) {
        alert(error.response.data.message);
      }
      throw error;
    });

    setUser(lsUser);
    setAccessToken(lsAccessToken);
    setLoading(false);
  }, []);

  const setSessionUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };
  const setSessionToken = (token) => {
    localStorage.setItem("access_token", token);
    setAccessToken(token);
  };
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    setAccessToken(null);
    setUser(null);
  };

  const memoValue = useMemo(
    () => ({ user, accessToken, setSessionUser, setSessionToken, logout }),
    [user, accessToken]
  );
  if (loading) {
    return;
  }
  return (
    <SessionContext.Provider value={memoValue}>
      {children}
    </SessionContext.Provider>
  );
};

export default function useSession() {
  return useContext(SessionContext);
}
