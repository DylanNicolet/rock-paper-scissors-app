import './App.css';
import React from 'react';
import paperIcon from "../src/images/icon-paper.svg"
import scissorsIcon from "../src/images/icon-scissors.svg"
import rockIcon from "../src/images/icon-rock.svg"


export default function App() {

  /* Create local storage for score if none exists */
  React.useEffect(() => {
    !localStorage.getItem("gameScore") && localStorage.setItem("gameScore", 0)
  }, [])

  /* App states*/
  const [score, setScore] = React.useState(localStorage.getItem("gameScore")? Number(localStorage.getItem("gameScore")) : 0)
  const [playerChoice, setPlayerChoice] = React.useState("")
  const [computerChoice, setComputerChoice] = React.useState("")
  const [gameStage, setGameStage] = React.useState(1)
  const [verdict, setVerdict] = React.useState("")
  const [timesPlayed, setTimesPlayed] = React.useState(0)

  /* Update score in localStorage and App state when timesPlayed changes */
  React.useEffect(() => {
    if(verdict === "YOU WIN"){
      localStorage.setItem("gameScore", score + 1)
      setScore(score + 1)
    }
    else if(verdict === "YOU LOSE" && score > 0){
      localStorage.setItem("gameScore", score - 1)
      setScore(score - 1)
    }
  }, [timesPlayed])

  /* Handle click function when user plays */
  function handleClick(playerChoice){
    setPlayerChoice(playerChoice)

    /* Randomly generate a choice for the computer */
    let choices = ["paper", "rock", "scissors"]
    let functionComputerChoice = choices[Math.floor(Math.random() * choices.length)]
    setComputerChoice(functionComputerChoice)

    /* Check playerChoice vs computerChoice to set a verdict */
    if(playerChoice === functionComputerChoice){
      setVerdict("DRAW")
    }
    else if((playerChoice === "paper" && functionComputerChoice === "rock") || (playerChoice === "rock" && functionComputerChoice === "scissors") || (playerChoice === "scissors" && functionComputerChoice === "paper")){
      setVerdict("YOU WIN")
    }
    else{
      setVerdict("YOU LOSE")
    }

    /* Used for updating score display */
    setTimesPlayed(timesPlayed + 1)

    /* Sets delays for updating the DOM to next game stages */
    setTimeout(() => {
      setGameStage(2)
    }, 500)
    setTimeout(() => {
      setGameStage(3)
    }, 1300)
    setTimeout(() => {
      setGameStage(4)
    }, 2000)
  }

  /* Defines icons and styling for player & computer choices */
  let playerChoiceImageSrc = (playerChoice === "rock"? rockIcon : undefined) || (playerChoice === "paper"? paperIcon : undefined) || (playerChoice === "scissors"? scissorsIcon : undefined)
  let playerChoiceBorderColor = (playerChoice === "rock"? "hsl(349, 71%, 52%)" : undefined) || (playerChoice === "paper"? "hsl(230, 89%, 62%)" : undefined) || (playerChoice === "scissors"? "hsl(39, 89%, 49%)" : undefined)
  let playerChoiceStyle = {border: `18px solid ${playerChoiceBorderColor}`}

  let computerChoiceImageSrc = (computerChoice === "rock"? rockIcon : undefined) || (computerChoice === "paper"? paperIcon : undefined) || (computerChoice === "scissors"? scissorsIcon : undefined)
  let computerChoiceBorderColor = (computerChoice === "rock"? "hsl(349, 71%, 52%)" : undefined) || (computerChoice === "paper"? "hsl(230, 89%, 62%)" : undefined) || (computerChoice === "scissors"? "hsl(39, 89%, 49%)" : undefined)
  let computerChoiceStyle = {border: `18px solid ${computerChoiceBorderColor}`}


  return (
    <section className='app'>
      <section className='score-container'>
        <p className='score-container__title'>ROCK <br />PAPER <br />SCISSORS</p>

        <section className='score-container__display'>
          <p>SCORE</p>
          <h2>{score}</h2>
        </section>
      </section>

      <section className="game-container">
            {gameStage === 1 &&
            <section className='stage1'>
                <button className='stage1__paper-button' onClick={e => handleClick("paper")}>
                <img src={paperIcon} alt="" />
                </button>

                <button className='stage1__scissors-button' onClick={e => handleClick("scissors")}>
                <img src={scissorsIcon} alt="" />
                </button>

                <button className='stage1__rock-button' onClick={e => handleClick("rock")}>
                <img src={rockIcon} alt="" />
                </button>
            </section>}

            {gameStage === 2 &&
            <section className="stage2">
                <section className="stage2__player-container">
                    <button style={playerChoiceStyle}><img src={playerChoiceImageSrc} alt="" /></button>
                    <p>YOU PICKED</p>
                </section> 

                <section className="stage2__computer-container">
                    <section className="stage2__computer-choice"></section>
                    <p>THE HOUSE PICKED</p>
                </section>
            </section>}

            {gameStage === 3 &&
            <section className="stage3">
               <section className="stage3__player-container">
                   <button style={playerChoiceStyle}><img src={playerChoiceImageSrc} alt="" /></button>
                   <p>YOU PICKED</p>
               </section> 

               <section className="stage3__computer-container">
                    <button style={computerChoiceStyle}><img src={computerChoiceImageSrc} alt="" /></button>
                    <p>THE HOUSE PICKED</p>
               </section>
           </section>}

           {gameStage === 4 &&
            <section className="stage4">
               <section className="stage4__player-container">
                   <button style={playerChoiceStyle}><img src={playerChoiceImageSrc} alt="" /></button>
                   <p>YOU PICKED</p>
               </section> 

               <section className="stage4__computer-container">
                    <button style={computerChoiceStyle}><img src={computerChoiceImageSrc} alt="" /></button>
                    <p>THE HOUSE PICKED</p>
               </section>
           </section>}

           {gameStage === 4 &&
            <section className="verdict">
               <h1>{verdict}</h1>
               <button onClick={e => setGameStage(1)}>PLAY AGAIN</button>
           </section>}
        </section>
      
      <section className="rules-button">
        <button>RULES</button>
      </section>
    </section>
  );
}