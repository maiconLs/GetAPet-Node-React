import api from '../../../utils/api'

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import styles from './PetDetails.module.css'
import { toast } from 'react-toastify'

import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

function PetDetails() {
  const [pet, setPet] = useState({})
  const { id } = useParams()
  const [token] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    api.get(`/pets/${id}`).then((response) => {
      setPet(response.data.pet)
    })
  }, [id])

  async function schedule() {

    const data = await api
      .patch(`pets/schedule/${pet._id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        toast.error(JSON.stringify(err.response.data.message))
        return err.response.data
      })

  }

  return (
    <>
      {pet.name && (
        <section className={styles.pet_details_container}>
          <div className={styles.petdetails_header}>
            <h1>Conhecendo o Pet: {pet.name}</h1>
            <p>Se tiver interesse, marque uma visita para conhecê-lo!</p>
          </div>
          <div className={styles.pet_images}>
            <Fade>
            {pet.images.map((image, index) => (
              <div className="each-slide" key={index}>
                <div className="image-container">
                 <img src={`${process.env.REACT_APP_API}/images/pets/${image}`} alt={p}/>
                </div>
               
              </div>
            ))}
            </Fade>
          </div>
          <p>
            <span className="bold">Peso:</span> {pet.weight}kg
          </p>
          <p>
            <span className="bold">Idade:</span> {pet.age} anos
          </p>
          {token ? (
            <button onClick={schedule}>Solicitar uma Visita</button>
          ) : (
            <p>
              Você precisa <Link to="/register">criar uma conta</Link> para
              solicitar a visita.
            </p>
          )}
        </section>
      )}
    </>
  )
}

export default PetDetails