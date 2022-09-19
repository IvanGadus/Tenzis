import Die from './components/Die';
import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';


export default function App() {

  const [dice, setDice] = useState(allNewNumbers())  
  const [tenzis, setTenzis] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [playTime, setPlayTime] = useState(0)

  useEffect(()=>{
    const value = dice[0].value
    if(dice.every((die)=>die.value===value && die.isHeld===true)){
      setTenzis(true)
    } 
  },[dice])

  
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
    if(!tenzis){
      setAttempts(prevAtempt => prevAtempt+1)
      setDice((prevDice)=>{
        return(
          prevDice.map((die)=>{
            return(
              die.isHeld ? die : {...die, value:Math.floor(Math.random()*6)+1}
            )
          })
        )
      })
    }else{
      setDice(allNewNumbers())
      setAttempts(0)
      setTenzis(false)
    }

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
          <button onClick={rollDice} className='rollBtn'>{!tenzis ? "Hoď kockami" : "Reštartovať hru"}</button>
          <p>Tvoje pokusy: <strong>{attempts}</strong></p>
        </main>
    </div>
  );
}


