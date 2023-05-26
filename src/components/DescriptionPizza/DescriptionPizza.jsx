/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import styles from './DescriptionPizza.module.scss'

const DescriptionPizza = () => {
  const [pizza, setPizza] = useState()
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const { data } = await axios.get(
          `https://62727f8825fed8fcb5f54bcd.mockapi.io/items/${id}`
        )
        setPizza(data)
      } catch (error) {
        alert(error.message)
        navigate('/')
      }
    }
    fetchPizzas()
  }, [id])

  return (
    <div className="container">
      {pizza ? (
        <div className={styles.root}>
          <img src={pizza.imageUrl} alt={pizza.title} />
          <h2>{pizza.title}</h2>
          <span>
            <Link to="/" className="button button--black">
              Back
            </Link>
          </span>
        </div>
      ) : (
        'Loading...'
      )}
    </div>
  )
}

export default DescriptionPizza
