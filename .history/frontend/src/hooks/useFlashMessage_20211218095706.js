import bus from "../utils/bus";

export default function UseFlashMessage(){
  function setFlashMessage(msg, type){
    bus.emit('flahs',{
      msg: msg,
      type: type
    })
  }

  return setFlashMessage
}