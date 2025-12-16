// CSS
import "./StartScreen.css"

export const StartScreen = ({startGame}) => {
  return (
    <div className="Start">
        <h1>Secret Word</h1>
        <h3>Clique no botão abaixo para começar!</h3>
        <button onClick={startGame}>Começar</button>
    </div>
  )
}
