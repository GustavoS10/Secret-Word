import { useState, useRef } from 'react';
import './TG.css';

const TG = ({vLetter, pC, pW, letters, gLetters, wLetters, guesses, score}) => {

  const [letter, setLetter] = useState('');
  const LIRef               = useRef(null);

  const hSubmit = (e)=>{
    e.preventDefault();
    vLetter(letter);
    setLetter('');
    LIRef.current.focus();
  }

  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>
      <h1>Advinhe a palavra</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{pC}</span> 
      </h3>
      <p>Você ainda tem {guesses} tentativas(s).</p>
      <div className="wordContainer">
        {letters.map((letter, i) => (
          gLetters.includes(letter) ? (
           <span key={i} className="letter">{letter}</span>

          ) : (
            <span key={i} className="blankSquare"></span>
            )
        ))}
      </div>
      <div className="letterContainer">
        <p>Tente advinhar a letra</p>
        <form onSubmit={hSubmit}>
          <input type="text" name="letter" maxLength="1" 
          required 
          onChange={(e)=> setLetter(e.target.value)} 
          value={letter}
          ref={LIRef}/>
          <button>Jogar!</button>
        </form>
      </div>
      <div className="wrongLetterContainer">
       {wLetters.map((letter, i) =>(
        <span key={i}>{letter}, </span>
       ))}
      </div>
    </div>
  )
}

export default TG