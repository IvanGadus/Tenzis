import Die from './components/Die';
import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';



export default function App() {

  const [dice, setDice] = useState(allNewNumbers())  

  function allNewNumbers(){
    const randomNumberArr = []
    for(let i = 0; i < 10; i++){
      const randomNumber = Math.floor(Math.random()*6)+1
      const oneDie ={
        value:randomNumber,
        isHold:false,
        key:uuid()
      }
      randomNumberArr.push(oneDie)
    }
    return randomNumberArr
  }
  

  function rollDice(){
    setDice(allNewNumbers())
  }


  const generateDice = dice.map((die) => {
    return(
      <Die 
      value={die.value} 
      key={die.key}
      isHold={die.isHold}
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


