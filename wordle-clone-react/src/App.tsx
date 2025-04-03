import { useEffect, useState } from "react";
import wordleWords from "./assets/words.json";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { BoardDefault, Guess } from "./helpers";
import { GuessLetterStatus, KeyboardKeyStatus, KeyboardLayout } from "./constants";

function App() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState<Array<Guess>>(BoardDefault);
  const [keyboard, setKeyboard] = useState(KeyboardLayout);
  const [currentGuessRow, setCurrentGuessRow] = useState(0);
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);

  useEffect(() => {
    const randomWord = wordleWords[Math.floor(Math.random() * wordleWords.length)];
    setSolution(randomWord);
  }, []);

  useEffect(() => {
    if (isGameOver) {
      return;
    }
  }, [isGameOver]);

  const onDelete = () => {
    const updatedGuesses = [...guesses];
    const updatedLetters = [...updatedGuesses[currentGuessRow].letters]; // Deep copy of letters
    updatedLetters[currentGuessIndex - 1] = { ...updatedLetters[currentGuessIndex - 1], letter: "" }; // Update specific letter
    updatedGuesses[currentGuessRow] = { ...updatedGuesses[currentGuessRow], letters: updatedLetters }; // Update row
    setGuesses(updatedGuesses);
    setCurrentGuessIndex(currentGuessIndex - 1);
  };

  const onLetterInput = (key: string) => {
    const updatedGuesses = [...guesses];
    const updatedLetters = [...updatedGuesses[currentGuessRow].letters]; // Deep copy of letters
    updatedLetters[currentGuessIndex] = { ...updatedLetters[currentGuessIndex], letter: key }; // Update specific letter
    updatedGuesses[currentGuessRow] = { ...updatedGuesses[currentGuessRow], letters: updatedLetters }; // Update row
    setGuesses(updatedGuesses);
    setCurrentGuessIndex(currentGuessIndex + 1);
  }

  const onEnter = () => {
    // Do a .join() of the current guess letters arr to make it a string
    // Compare the string to the solution to see if they are the same
    const guessWord = guesses[currentGuessRow].letters.map(l => l.letter).join("");
    const updatedGuesses = [...guesses]; // Deep copy of guesses
    const updatedKeyboard = keyboard.map(row => row.map(key => ({ ...key }))); // Deep copy of keyboard

    if (guessWord === solution) {
      // guess is correct; game is over
      for (let i = 0; i < 5; i++) {
        updatedGuesses[currentGuessRow].letters[i].status = GuessLetterStatus.Correct;
      }
      setIsGameOver(true);
    } else {
      // initial pass of the guess letters to only mark correct and absent letters
      for (let i = 0; i < 5; i++) {        
        const guessLetter = updatedGuesses[currentGuessRow].letters[i];
        
        if (guessLetter.status !== GuessLetterStatus.Correct && guessLetter.letter === solution.split('')[i]) {
          updatedGuesses[currentGuessRow].letters[i].status = GuessLetterStatus.Correct;

          // need to update status for the letter on the keyboard; is there a better way to do this?
          for (const kbRow of updatedKeyboard) {
            const key = kbRow.find(k => k.key === guessLetter.letter);
            if (key) {
              key.status = KeyboardKeyStatus.Present;
              break;
            }
          }

        } else if (!solution.includes(guessLetter.letter)) {
          updatedGuesses[currentGuessRow].letters[i].status = GuessLetterStatus.Absent;

          // need to update status for the letter on the keyboard; is there a better way to do this?
          for (const kbRow of updatedKeyboard) {
            const key = kbRow.find(k => k.key === guessLetter.letter);
            if (key) {
              key.status = KeyboardKeyStatus.Absent;
              break;
            }
          }
        }
      }

      // second pass ignoring Correct/Absent letters & checking for Misplaced letters
      for (let i = 0; i < 5; i++) {
        const guessLetter = updatedGuesses[currentGuessRow].letters[i];

        if (guessLetter.status === GuessLetterStatus.Unknown) {
          if (solution.includes(guessLetter.letter)) {
            updatedGuesses[currentGuessRow].letters[i].status = GuessLetterStatus.Misplaced;
          }
        }
      }
      
      setKeyboard(updatedKeyboard);
      setGuesses(updatedGuesses);
      setCurrentGuessRow(currentGuessRow + 1);
      setCurrentGuessIndex(0);
    }    
  }

  const handleKeyAction = (key: string) => {
    if (isGameOver) return;

    if (key === 'ENTER') {
      // check if 5 letters have been entered for the guess
      if (currentGuessIndex !== 5) {
        return;
      }
      onEnter();
    } else if (key === 'BACKSPACE' || key === 'BACK') { // also checking for 'BACK' because that of the text of the button
      if (currentGuessIndex > 0) {
        onDelete();
      }
    } else {
      if (currentGuessRow < 6 && currentGuessIndex < 5) {
        onLetterInput(key);
      }
    }
    
  }

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="flex">
        {solution}
      </div>
      <Board guesses={guesses} />
      <Keyboard keys={keyboard} handleKeyAction={handleKeyAction} />
    </div>
  )
}

export default App
