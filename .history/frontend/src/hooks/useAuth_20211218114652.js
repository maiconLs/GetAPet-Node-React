import api from "../utils/api";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 


 export default function useAuth(){
   const [authenticated, setAuthenticated] = useState(false)
   const {navigate} = useNavigate()

   useEffect(() => {
      const token = localStorage.getItem('token')
      if(token){
        api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
        setAuthenticated(true)
      }
   },[])

   async function register(user) {

    
      const data = await api.post('/users/register', user)
      .then(async (response) => {
        toast.success('Cadastro realizado com sucesso')

        return response.data

      }).catch((error) => {
        toast.error(error.response.data.message)

      })
      console.log(data)

    } 

    async function authUser(data){
      setAuthenticated(true)
      localStorage.setItem('token', data.token)
      navigate('/')
    }
    
    return {register}
 }