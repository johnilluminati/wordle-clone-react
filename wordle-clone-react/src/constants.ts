export enum GuessLetterStatus {
  Unknown, // default status
  Correct, // is in the correct position
  Misplaced, // is in the word but in the wrong position
  Absent, // is not in the word
}

export enum KeyboardKeyStatus {
  Unknown, // default status
  Absent, // letter is not in the word
  Present // letter is in the word
}

export const KeyboardLayout = [
  [
    { key: "Q", status: KeyboardKeyStatus.Unknown },
    { key: "W", status: KeyboardKeyStatus.Unknown },
    { key: "E", status: KeyboardKeyStatus.Unknown },
    { key: "R", status: KeyboardKeyStatus.Unknown },
    { key: "T", status: KeyboardKeyStatus.Unknown },
    { key: "Y", status: KeyboardKeyStatus.Unknown },
    { key: "U", status: KeyboardKeyStatus.Unknown },
    { key: "I", status: KeyboardKeyStatus.Unknown },
    { key: "O", status: KeyboardKeyStatus.Unknown },
    { key: "P", status: KeyboardKeyStatus.Unknown },
  ],
  [
    { key: "A", status: KeyboardKeyStatus.Unknown },
    { key: "S", status: KeyboardKeyStatus.Unknown },
    { key: "D", status: KeyboardKeyStatus.Unknown },
    { key: "F", status: KeyboardKeyStatus.Unknown },
    { key: "G", status: KeyboardKeyStatus.Unknown },
    { key: "H", status: KeyboardKeyStatus.Unknown },
    { key: "J", status: KeyboardKeyStatus.Unknown },
    { key: "K", status: KeyboardKeyStatus.Unknown },
    { key: "L", status: KeyboardKeyStatus.Unknown },
  ],
  [
    { key: "ENTER", status: KeyboardKeyStatus.Unknown },
    { key: "Z", status: KeyboardKeyStatus.Unknown },
    { key: "X", status: KeyboardKeyStatus.Unknown },
    { key: "C", status: KeyboardKeyStatus.Unknown },
    { key: "V", status: KeyboardKeyStatus.Unknown },
    { key: "B", status: KeyboardKeyStatus.Unknown },
    { key: "N", status: KeyboardKeyStatus.Unknown },
    { key: "M", status: KeyboardKeyStatus.Unknown },
    { key: "BACK", status: KeyboardKeyStatus.Unknown },
  ],
]