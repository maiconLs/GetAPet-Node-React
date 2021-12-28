import api from "../utils/api";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 


 export default function useAuth(){
   const [authent]

   async function register(user) {

    
      const data = await api.post('/users/register', user)
      .then((response) => {
        toast.success('Cadastro realizado com sucesso')

        return response.data
      
      }).catch((error) => {
        toast.error(error.response.data.message)

      })
      console.log(data)

    } 

    async function authUser(data){
      setAuthenticate(true)
      localStorage.setItem('token', data.token)

    }
    
    return {register}
 }