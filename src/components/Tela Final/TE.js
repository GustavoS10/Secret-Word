import './TE.css';

const TE = ({retry, score}) => {
  return (
    <div>
      <h1>Fim de jogo!</h1>
      <h2>A sua pontuação foi: {score}</h2>
      <button onClick={retry}>Reiniciar o game!</button>
    </div>
  )
}

export default TE