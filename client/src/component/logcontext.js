import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const LogContext = createContext();

export const LogProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      await axios
        .get("https://mad-stuffs-uc64.vercel.app/logcheck", {
          withCredentials: true,
        })
        .then((response) => {
          console.log("testing")
          console.log(response)
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
