import { useEffect } from "react";
import { KeyboardKeyStatus, KeyboardLayout } from "../constants"

interface KeyboardProps {
  keys: typeof KeyboardLayout;
  handleKeyAction: (key: string) => void;
}

function getColorStyle(status: KeyboardKeyStatus): string {
  switch (status) {
    case KeyboardKeyStatus.Absent:
      return "bg-[#3a3a3c]";
    case KeyboardKeyStatus.Present:
      return "bg-[#538d4e]";
    default:
      return "bg-[#818384]";
  }
}

const Keyboard: React.FC<KeyboardProps> = ({ keys, handleKeyAction }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      if (key === "ENTER" || key === "BACKSPACE" || /^[A-Z]$/.test(key)) {
        handleKeyAction(key);
      }      
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    }
  }, [handleKeyAction]);

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col gap-[6px]">
        {keys.map((row, index) => {
          return (
            <div key={index} className={`flex justify-center gap-[6px]`}>
              {row.map((key, keyIndex) => {
                return (
                  <button
                    type="button"
                    key={keyIndex}
                    // the font needs to be smaller if the button is 'ENTER' or 'BACK', hence why we are checking for the length
                    className={`flex ${getColorStyle(key.status)} rounded-sm p-3 justify-center items-center font-bold text-[${key.key.length > 1 ? "12px" : "1.25rem"}] uppercase cursor-pointer`}
                    onClick={() => handleKeyAction(key.key)}
                  >
                    {key.key}
                  </button>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Keyboard