import { useEffect, useState } from "react";
import wordleWords from "./assets/words.json";

function App() {
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState<Array<Array<string>>>(Array(6).fill(Array(5).fill("")));

  useEffect(() => {
    const randomWord = wordleWords[Math.floor(Math.random() * wordleWords.length)];
    setSolution(randomWord);
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="flex justify-center items-center h-[420px] w-[350px]">
          <div className="grid grid-rows-6 gap-[5px]">
            {guesses.map((guess, index) => {
              return (
                <div key={index} className="grid grid-cols-5 gap-[5px]">
                  {guess.map((letter, letterIndex) => (
                    <div key={letterIndex} className="inline-flex border-2 border-gray-600 h-[62px] w-[62px] justify-center items-center font-bold text-[2rem] uppercase">{letter}</div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
        {/* <div className="flex flex-col justify-between h-[400px]">
          {guesses.map((guess, index) => {
            return (
                <div key={index} className="flex flex-row w-[330px] justify-between">
                  {guess.map((letter, letterIndex) => (
                    <div key={letterIndex} className="border-2 border-gray-600 h-[62px] w-[62px] align-bottom">{letter}</div>
                  ))}
                </div>
            )
          })}
        </div> */}
        <div className="flex">
          {solution}
        </div>
      </div>
    </>
  )
}

export default App
