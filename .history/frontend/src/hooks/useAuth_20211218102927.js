import api from "../utils/api";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import UseFlashMessage from "./useFlashMessage";

 export default function useAuth(){
   const {setFlahsMessage} = UseFlashMessage()

    async function register(user){

      let msgText = 'Cadastro realizado com sucesso!'
      let msgType = 'success'

      try {
       const data = await api.post('users/register', user)
       .then((response) => {
         return response.data
       })

      } catch (error) {
          let msgText = error.response.data.message
          let msgType = 'error'
      }
      setFlahsMessage(msgText, msgType)
    }
    return {register}
 }