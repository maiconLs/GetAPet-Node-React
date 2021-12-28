import { useEffect, useState } from "react";
import bus from "../../utils/bus";

import styles from './Message.module.css'

function Message(){
  const [visibility, setVisibility] = useState(false)
  const [message, setMessage] = useState()
  const [type, setType] = useState('')

  useEffect(() => {
    bus.addListener
  }, [])

  return(
    
    <div className={`${styles.message} ${styles[type]}`}>Message</div>
  )

}

export default Message