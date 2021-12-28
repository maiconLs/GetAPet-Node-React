import api from "../utils/api";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import UseFlashMessage from "./useFlashMessage";

 export default function useAuth(){

    async function register(user){
      
      try {
       const data = await api.post('users/register', user)
       .then((response) => {
         return response.data
       })

      } catch (error) {
        console.log(error)
      }

    }
    return {register}
 }