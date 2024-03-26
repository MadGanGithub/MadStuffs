import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const LogContext = createContext();

export const LogProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      await axios
        .get("http://localhost:4100/logcheck", {
          withCredentials: true,
        })
        .then((response) => {
          setLogged(response.data);
        });
    };
    checkToken();
  }, [logged, setLogged]);

  return (
    <LogContext.Provider value={{ logged, setLogged }}>
      {children}
    </LogContext.Provider>
  );
};
