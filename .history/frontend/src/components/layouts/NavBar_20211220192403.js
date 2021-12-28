import {Link} from 'react-router-dom'
import { useContext } from 'react'
import Context 

import logo from '../../assets/logo.png'
import styles from './Navbar.module.css'

const {authenticated} = useContext(Context)

function NavBar(){
  return(
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={logo} alt="Logo Get A Pet"/>
        <h2>Get A Pet</h2>
      </div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Entrar</Link></li>
        <li><Link to="/register">Cadastrar</Link></li>

      </ul>
    </nav>
  )
}

export default NavBar