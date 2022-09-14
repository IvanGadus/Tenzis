import React from 'react'

export default function Die(props) {
  return (
    <button onClick={()=>props.holdDice(props.id)} className='dieBtn'>{props.value}</button>
  )
}
