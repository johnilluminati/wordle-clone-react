import { GuessLetterStatus } from "../constants"
import { Guess } from "../helpers"

function getColorStyle(status: GuessLetterStatus): string {
  switch (status) {
    case GuessLetterStatus.Absent:
      return "bg-[#3a3a3c]";
    case GuessLetterStatus.Misplaced:
      return "bg-[#b59f3b]";
    case GuessLetterStatus.Correct:
      return "bg-[#538d4e]";
    default:
      return "border-2 border-gray-600";
  }
}

const Board = ({ guesses }: { guesses: Guess[] }) => {
  return (
    <div className="flex justify-center items-center h-[420px] w-[350px]">
      <div className="grid grid-rows-6 gap-[5px]">
        {guesses.map((guess, index) => {
          return (
            <div key={index} className="grid grid-cols-5 gap-[5px]">
              {guess.letters.map((letter, letterIndex) => {                
                return (
                  <div key={letterIndex} className={`inline-flex ${getColorStyle(letter.status)} h-[62px] w-[62px] justify-center items-center font-bold text-[2rem] uppercase`}>
                    {letter.letter}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Board