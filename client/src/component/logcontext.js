import React, { createContext, useState } from 'react';

export const LogContext = createContext();

export const LogProvider = ({ children }) => {
  const [logged,setLogged] = useState(false);
  console.log(logged+"madhaavadfg")
  return (
    <LogContext.Provider value={{logged,setLogged }}>
      {children}
    </LogContext.Provider>
  );
};
