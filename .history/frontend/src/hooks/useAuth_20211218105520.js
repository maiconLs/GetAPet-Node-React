import api from "../utils/api";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {toast} from 'react-toastify'


 export default function useAuth(){

   async function register(user) {

    
      const data = await api.post('/users/register', user)
      .then((response) => {
        toast.success('Cadastro realizado com sucesso')

        console.log(data)
        return response.data
      
      }).catch((error) => {

      })

    } 
    

  }
    return {register}
 }