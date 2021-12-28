import api from "../utils/api";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {toast} from 'react-toastify'

import useFlashMessage from "./useFlashMessage";

 export default function useAuth(){

   async function register(user) {
  

    try {
      const data = await api.post('/users/register', user).then((response) => {
        return response.data
      })

    } catch (error) {
      msgText = error.response.data.message
      msgType = 'error'
    }

    setFlashMessage(msgText, msgType)
  }
    return {register}
 }