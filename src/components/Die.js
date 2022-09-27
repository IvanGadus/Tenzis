import React from 'react'

export default function Die(props) {
    const style = {
        backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF",
        pointerEvents: (props.myInterval === 0 || props.tenzis ) ? "none" : "auto",
    }
  return (
    <button style={style} onClick={()=>props.holdDice(props.id)} className='dieBtn'>{props.value}</button>
  )
}
