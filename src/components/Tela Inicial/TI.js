import { useState } from 'react'
import './TI.css'

const TI = ({startGame}) => {
  return (
    <div className="start">
        <h1>Secret Word</h1>
        <p>Clique no botão e teste seus conhecimentos!</p>
        <button onClick={startGame}>Iniciar o game</button>
    </div>
  )
}

export default TI