import { useState } from "react";

import styles from './Message.module.css'

function Message(){
  const [visibility, setVisibility] = useState(false)
  const [message, setMessage] = useState()
  const [type, setType] = useState('')

  return(
    <div className={`${styles.message} ${styles[type]}`}>Message</div>
  )

}

export default Message