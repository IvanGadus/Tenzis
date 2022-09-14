import Die from './components/Die';
import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';



export default function App() {

  const [dice, setDice] = useState(allNewNumbers())  
  console.log(dice)

  function allNewNumbers(){
    const randomNumberArr = []
    for(let i = 0; i < 10; i++){
      const randomNumber = Math.floor(Math.random()*6)+1
      const oneDie ={
        value:randomNumber,
        isHeld:false,
        id:uuid()
      }
      randomNumberArr.push(oneDie)
    }
    return randomNumberArr
  }

  function holdDice(id){
    setDice((prevDice) =>{
      return(
        prevDice.map((die) =>{
            return(
              die.id === id ? {...die, isHeld:!die.isHeld} : die
            )
        })
      )
    })
  }
  

  function rollDice(){
    setDice((prevDice)=>{
      return(
        prevDice.map((die)=>{
          return(
            die.isHeld ? die : {...die, value:Math.floor(Math.random()*6)+1}
          )
        })
      )
    })
  }


  const generateDice = dice.map((die) => {
    return(
      <Die 
      value={die.value} 
      key={die.id}
      id={die.id}
      isHeld={die.isHeld}
      holdDice={holdDice}
      />
    )
  })


  return (
    <div className="App">
        <main>
          <div className="diceContainer">
            {generateDice}
          </div>
          <button onClick={rollDice} className='rollBtn'>Hoď kockami</button>
        </main>
    </div>
  );
}


