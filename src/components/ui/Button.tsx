import type { ReactElement } from "react";

interface ButtonProps{
  text: string,
  variant: "primary" | "secondary",
  startIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
}

const variantClasses = {
  "primary": "bg-purple-600 text-white",
  "secondary": "bg-purple-200 text-purple-600",
};

const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center";


export function Button({variant, text, startIcon, onClick, fullWidth}: ButtonProps){

  return <button className={variantClasses[variant]+ " " + defaultStyles + (fullWidth ? " w-full justify-center" : "")} onClick={() => {
    onClick?.();
  }}>
    <div className="pr-2">
      {startIcon}
    </div>
    {text}
  </button>
  

}