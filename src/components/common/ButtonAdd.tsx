import { ButtonHTMLAttributes } from "react"


const ButtonAdd = ({ text = '', ...props } : {text : string} & ButtonHTMLAttributes<HTMLButtonElement> ) => {
   return (
      <button
         role="button"
         type="button"
         className="bg-[#1d3660] text-white px-3 py-2 flex items-center gap-3 rounded-lg text-sm font-medium"
         {...props}
      >
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
         </svg>
        {text}
      </button>
   )
}

export default ButtonAdd