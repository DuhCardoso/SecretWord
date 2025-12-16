import "./GameOver.css";

export const GameOver = ({ retryGame, score }) => {
  return (
    <div>
      <h1>Fim de Jogo!</h1>
      <h2>
        Sua pontuação foi: <span>{score}</span>
      </h2>
      <button onClick={retryGame}>Recomeçar</button>
    </div>
  );
};
