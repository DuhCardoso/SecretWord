// CSS
import "./App.css";

// React
import { useCallback, useEffect, useState } from "react";

// Data
import { wordsList } from "./data/words.js";

// Componets
import { StartScreen } from "./components/StartScreen";
import { GameOver } from "./components/GameOver.js";
import { Game } from "./components/Game.js";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const guessesQty = 3;

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetter] = useState([]);

  const [guessedLetters, setGessedLetters] = useState([]);
  const [wrongLetter, setWrongLetters] = useState([]);
  const [guesses, setGusses] = useState(guessesQty);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(() => {
    // Pick random category
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    console.log(category);

    // Pick Random Word
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    console.log(word);

    return { word, category };
  }, [words]);

  // Start Game
  const startGame = useCallback(() => {
    // Reset all letter
    clearLetterStates();

    // Pick word and pick category
    const { word, category } = pickWordAndCategory();

    // Create a Array of letter
    let wordLetter = word.split("");

    wordLetter = wordLetter.map((l) => l.toLowerCase());

    // console.log(word, category);
    console.log(wordLetter);

    // Fill states
    setPickedWord(word);
    setPickedCategory(category);
    setLetter(wordLetter);

    // Transfor
    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  // Verificar letras
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    //check if letter has already been utilized
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetter.includes(normalizedLetter)
    ) {
      return;
    }

    //push guessed letter or remove a guess
    if (letters.includes(normalizedLetter)) {
      setGessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setGusses((actualGuessed) => actualGuessed - 1);
    }

    console.log(guessedLetters);
    console.log(wrongLetter);
  };

  // Reset game letters
  const clearLetterStates = () => {
    setGessedLetters([]);
    setWrongLetters([]);
  };

  // Check if gusses ended
  useEffect(() => {
    if (guesses <= 0) {
      // Reset all states

      clearLetterStates();
      setGameStage(stages[2].name);
    }
  }, [guesses]);

  // check win condition
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    // win condition
    if (guessedLetters.length === uniqueLetters.length) {
      // add score
      setScore((actualScore) => (actualScore += 100));

      // Restart game with new word
      startGame();
    }
  }, [guessedLetters, letters, startGame]);

  const retryGame = () => {
    setScore(0);
    setGusses(guessesQty);

    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetter={wrongLetter}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver retryGame={retryGame} score={score} />}
    </div>
  );
}

export default App;
