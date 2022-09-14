import React from 'react'

export default function Die(props) {
    const style = {
        backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF"
    }
  return (
    <button style={style} onClick={()=>props.holdDice(props.id)} className='dieBtn'>{props.value}</button>
  )
}
