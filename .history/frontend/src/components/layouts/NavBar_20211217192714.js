import {Link} from 'react-router-dom'

import logo from '../../assets/logo.png'

function NavBar(){
  return(
    <nav>
      <div>
        <img src={logo} alt="Logo "/>
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