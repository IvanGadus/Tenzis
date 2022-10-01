import Die from './components/Die';
import ScoreBoard from './components/ScoreBoard';
import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import Confetti from 'react-confetti'


export default function App() {

  const [dice, setDice] = useState(allNewNumbers())  
  const [tenzis, setTenzis] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [playTime, setPlayTime] = useState({ms:0, s:0,m:0})
  const [myInterval, setMyInterval] = useState(0) 
  const [gameIsShown, setGameIsShown] = useState(true)
  const [scoreIsShown, setScoreIsshown] = useState(false)
  const [tableData, setTableData] = useState(JSON.parse(localStorage.getItem("tableData")) || [])


  useEffect(()=>{
    const value = dice[0].value
    if(dice.every((die)=>die.value===value && die.isHeld===true)){
      setTenzis(true)
    } 
  },[dice])

  useEffect(()=>{
    if(tenzis){
      const result = {attempts:attempts,playTime:playTime}
      setTableData((prev)=>(
        [...prev, result]
      ))
    }
  },[tenzis])

  useEffect(()=>{
    localStorage.setItem("tableData",JSON.stringify(tableData))
  },[tableData])
  
  // localStorage.clear()
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
      setMyInterval(0)
      setPlayTime({ms:0, s:0,m:0})
    }

  }


  const generateDice = dice.map((die) => {
    return(
      <Die 
      tenzis={tenzis}
      myInterval={myInterval}
      value={die.value} 
      key={die.id}
      id={die.id}
      isHeld={die.isHeld}
      holdDice={holdDice}
      />
    )
  })

  let updateMS = playTime.ms, updateS = playTime.s, updateM = playTime.m

  function run() {
    if(updateS === 60){
      updateM ++
      updateS = 0
    }
    if(updateMS === 100){
      updateS ++
      updateMS = 0
    }
    updateMS = updateMS + 10
    return setPlayTime({ms:updateMS, s:updateS, m:updateM})
  }

  if(tenzis){
    stopStopWatch()
  }
  // localStorage.clear()
  // console.log(tableData)


  function startStopWatch(){
    setMyInterval(setInterval(run,100)) 
  }
  function stopStopWatch(){
    clearInterval(myInterval)
  }

  function handleClickScore(){
    setGameIsShown(false)
    setScoreIsshown(true)
  }

  function handleClickGame(){
    setGameIsShown(true)
    setScoreIsshown(false)
  }
  const stylePointerEvents = {
    pointerEvents:myInterval === 0 | tenzis ? "auto" : "none"
  }

  return (
    <div className="App">  

      {tenzis && <Confetti />}
      <div className='scoreBoard'>
        <button style={stylePointerEvents} onClick={handleClickScore} className='scoreButton scoreBoardButton tooltip'>Skóre</button>
        <button onClick={handleClickGame} className='gameButton scoreBoardButton'>Hra</button>
      </div>   
        {gameIsShown && (
          <main> 
            <div className="diceContainer">
              {generateDice}
            </div>
            {myInterval === 0 ? <button className='rollBtn' onClick={startStopWatch}>Start</button> : <button onClick={rollDice} className='rollBtn'>{!tenzis ? "Hoď kockami" : "Reštartovať hru"}</button>}
            <p>Tvoje pokusy: <strong>{attempts}</strong></p>
            <p>{playTime.s < 10 && "0"}{playTime.s} : {playTime.ms < 10 && "0"}{playTime.ms === 100 ? "00" : playTime.ms}</p>
          </main>)}
    
        {scoreIsShown && (
          <ScoreBoard />
        )}
    </div>
  );
}

