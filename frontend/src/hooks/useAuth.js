import api from "../utils/api";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 


 export default function useAuth(){
   const [authenticated, setAuthenticated] = useState(false)
   const navigate = useNavigate()

   useEffect(() => {
      const token = localStorage.getItem('token')
      if(token){
        api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
        setAuthenticated(true)
      }
   },[])

   async function register(user) {
   
      try {
        const data = await api.post('/users/register', user).then((response) => {
          toast.success('Cadastro realizado com sucesso')

          return response.data
        })

        await authUser(data)
        
      } catch (error) {
        toast.error(error.response.data.message)

      }
    } 

    async function authUser(data){
      setAuthenticated(true)
      localStorage.setItem('token', JSON.stringify(data.token))
      navigate('/')
    }

    async function login(user){
      try {
        const data = await api.post('/users/login', user).then((response) => {
          toast.success('Login realizado com sucesso')

          return response.data
        })

        await authUser(data)
        
      } catch (error) {
        toast.error(error.response.data.message)

      }
    }

    function logout(){
      setAuthenticated(false)
      localStorage.removeItem('token')
      api.defaults.headers.Authorization = undefined
      toast.success('Logout realizado com sucesso!')
      navigate('/')
    }
    
    return {register, logout, login, authenticated}
 }