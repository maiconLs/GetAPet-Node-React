import api from '../../../utils/api'

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import styles from '../Pet/Dashboard.module.css'

import RoundedImage from '../../layouts/RoundedImage'

import { toast } from 'react-toastify'


function MyPets() {
  const [pets, setPets] = useState([])
  const [token] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    api
      .get('/pets/mypets', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPets(response.data.pets)
      })
  }, [token])

  async function removePet(id) {

    const data = await api
      .delete(`/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        const updatedPets = pets.filter((pet) => pet._id !== id)
        setPets(updatedPets)
        return response.data
      })
      .catch((err) => {
        console.log(err)
        toast.error(JSON.stringify(err.response.data.message))
        return err.response.data
      })

  }

  async function concludeAdoption(id) {

    const data = await api
      .patch(`/pets/conclude/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err)
        toast.error(JSON.stringify(err.response.data.message))
        return err.response.data
      })

  }

  return (
    <section>
      <div className={styles.petslist_header}>
        <h1>Meus Pets Cadastrados</h1>
        <Link to="/pet/add">Cadastrar Pet</Link>
      </div>
      <div className={styles.petslist_container}>
        {pets.length > 0 &&
          pets.map((pet) => (
            <div key={pet._id} className={styles.petlist_row}>
              <RoundedImage
                src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
                alt={pet.name}
                width="px75"
              />
              <span className="bold">{pet.name}</span>
              <div className={styles.actions}>
                {pet.available ? (
                  <>
                    {pet.adopter && (
                      <button
                        className={styles.conclude_btn}
                        onClick={() => {
                          concludeAdoption(pet._id)
                        }}
                      >
                        Concluir adoção
                      </button>
                    )}

                    <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
                    <button
                      onClick={() => {
                        removePet(pet._id)
                      }}
                    >
                      Excluir
                    </button>
                  </>
                ) : (
                  <p>Pet já adotado</p>
                )}
              </div>
            </div>
          ))}
        {pets.length === 0 && <p>Ainda não há pets cadastrados!</p>}
      </div>
    </section>
  )
}

export default MyPets