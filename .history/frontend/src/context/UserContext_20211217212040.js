import { useState, UseEffect, createContext } from "react";
import { useContext } from "react";

import useAuth from "../hooks/useAuth";

const Context = createContext

function UserProvider(){
  const {register} = useAuth
  
  return(
    <Context.Provider value={{register}}>
      {children}
    </Context.Provider>
