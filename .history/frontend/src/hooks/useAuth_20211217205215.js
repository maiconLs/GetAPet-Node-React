import api from "../utils/api";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

 export default function useAuth(){

    async function register(user){
      await api.post('/users/create', user).then(
        
      )
    }
    return 
 }