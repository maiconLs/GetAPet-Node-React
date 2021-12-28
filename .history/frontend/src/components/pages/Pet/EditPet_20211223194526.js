import api from '../../../utils/api'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import styles from './AddPet.module.css'

import PetForm from '../../form/PetForm'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'; 


function EditPet() {
  const [pet, setPet] = useState({})
  const [token] = useState(localStorage.getItem('token') || '')
  const { id } = useParams()

  useEffect(() => {
    api
      .get(`/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPet(response.data.pet)
      })
  }, [token, id])

  async function updatePet(pet) {

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

    const data = await api
      .patch(`pets/${pet._id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        toast.error(JSON.stringify(err.response.data.message))

        return response.data
      })
      .catch((err) => {
        toast.error(JSON.stringify(err.response.data.message))
        return err.response.data
      })

  }

  return (
    <section>
      <div className={styles.addpet_header}>
        <h1>Editando o Pet: {pet.name}</h1>
        <p>Depois da edição os dados serão atualizados no sistema</p>
      </div>
      {pet.name && (
        <PetForm handleSubmit={updatePet} petData={pet} btnText="Editar" />
      )}
    </section>
  )
}

export default EditPet