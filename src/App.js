import './App.css';
import TI from './components/Tela Inicial/TI';
import TG from './components/Tela Game/TG';
import TE from './components/Tela Final/TE';
import { useCallback, useEffect, useState } from 'react';
import {wordList} from '../src/data/words';


const stage =[
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"},
]

const gessesLetters = 5;

function App() {
  const [gStage, setgStage]           = useState(stage[0].name);
  const [words]                       = useState(wordList);
  const [pW, setpw]                   = useState("");
  const [pC, setpc]                   = useState("");
  const [letters, setLetters]         = useState([]);
  const [gLetters, setgLetters]       = useState([]);
  const [wLetters, setwLetters]       = useState([]);
  const [guesses, setGesses]          = useState(gessesLetters);
  const [score, setScore]             = useState(0);

  const pickWC = useCallback(()=>{
    const categorias = Object.keys(words);
    const category   = categorias[Math.floor(Math.random()  * Object.keys(categorias).length)]
    const word = words[category][Math.floor(Math.random()  * words[category].length)];
    return {word, category};
  }, [words])

  //Starta o game
  const startGame = useCallback(() =>{
    //limpando todas as letras
    clearLS();
    //escolhe palavra e categoria
    const {word, category} = pickWC();

    //desestruturando a palavra
    let wLetter = word.split('');
    wLetter     = wLetter.map((l) => l.toLowerCase());

    setpw(word)
    setpc(category)
    setLetters(wLetter)
    setgStage(stage[1].name);
  }, [pickWC])

  //Pega a letra do game 
  const vLetter = (letter) =>{

    const nLetter = letter.toLowerCase();
    //checando se a letra ja foi usada
    if(gLetters.includes(nLetter) || wLetters.includes(nLetter)){
      return;
    }

    //incluindo acertou ou o erro da letra
    if(letters.includes(nLetter)) {
      setgLetters((actualgLetters)=>[
        ...actualgLetters,
        nLetter
      ]);
    }else{
      setwLetters((actualwLetters)=>[
        ...actualwLetters,
        nLetter
      ]);
      setGesses((actualGuesses)=>actualGuesses - 1)
      }
    }

    const clearLS = ()=>{
      setgLetters([]);
      setwLetters([]);
    }

  //checa condiçao de derrota
  useEffect(()=>{
    if(guesses === 0){
      clearLS();
      setgStage(stage[2].name)
    }
  }, [guesses])
  useEffect(()=>{
    const uLeters = [...new Set(letters)]

    if(gLetters.length === uLeters.length){
      //adiciona os pontos
      setScore((actualScore) => actualScore += 10);
      //passa pra proxima palavra
      startGame();
    }

  }, [gLetters, letters, startGame])

  //reinicar o game 
  const retry = () =>{
    setgStage(stage[0].name);
    setScore(0);
    setGesses(gessesLetters);
  }

  return (
    <div className="App">
      {gStage === 'start' && <TI startGame={startGame} />}
      {gStage === 'game' && <TG 
      vLetter={vLetter} 
      pW={pW} 
      pC={pC} 
      letters={letters} 
      gLetters={gLetters}
      wLetters={wLetters}
      guesses={guesses}
      score={score}/>}
      {gStage === 'end' && <TE retry={retry} score={score}/>}
    </div>
  );
}

export default App;
