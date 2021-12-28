import api from '../../../utils/api'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './AddPet.module.css'

import PetForm from '../../form/PetForm'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'; 

function AddPet() {
  const [token] = useState(localStorage.getItem('token') || '')
  const navigate = useNavigate()

  async function registerPet(pet) {

    const formData = new FormData()

    const petFormData = await Object.keys(pet).forEach((key) => {
      if (key === 'images') {
        for (let i = 0; i < pet[key].length; i++) {
          formData.append(`images`, pet[key][i])
        }
      } else {
        formData.append(key, pet[key])
      }
    })

    formData.append('pet', petFormData)

    await api
      .post(`pets/create`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        navigate('/pet/mypets')
        toast.success("Pet cadastrado com sucesso")
        console.log(response.data)
        return response.data
      })
      .catch((err) => {
       console.log(toast.error( err)) 
        return err.response.data
      })

  }

  return (
    <section>
      <div className={styles.addpet_header}>
        <h1>Cadastre um Pet</h1>
        <p>Depois ele ficará disponível para adoção</p>
      </div>
      <PetForm handleSubmit={registerPet} btnText="Cadastrar" />
    </section>
  )
}

export default AddPet