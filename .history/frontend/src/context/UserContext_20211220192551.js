import React, { createContext } from "react";

import useAuth from "../hooks/useAuth";

const Context = createContext();

function UserProvider({ children }) {
  const { register} = useAuth();

  return (
    <Context.Provider
      value={{ register, authenticated}}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, UserProvider };