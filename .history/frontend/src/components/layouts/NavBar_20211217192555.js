import {Link} from 'react-router-dom'

import logo from '../../assets/logo.png'

function NavBar(){
  return(
    <nav>
      <div>
        <img src={logo}/>
      </div>
      <ul>
        <li >Home</li>
      </ul>
    </nav>
  )
}

export default NavBar