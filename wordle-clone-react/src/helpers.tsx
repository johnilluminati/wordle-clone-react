import { GuessLetterStatus, KeyboardKeyStatus } from "./constants.ts";

export interface GuessLetter {
  letter: string;
  status: GuessLetterStatus;
}

export interface Guess {
  letters: Array<GuessLetter>;
  //isCorrect: boolean;
}

export const BoardDefault = Array<Guess>(6).fill({
  letters: Array<GuessLetter>(5).fill({
    letter: "",
    status: GuessLetterStatus.Unknown,
  }),
  //isCorrect: false,
});

export interface KeyboardKey {
  letter: string;
  status: KeyboardKeyStatus
}