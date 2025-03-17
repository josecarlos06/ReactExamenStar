

const ButtonClose = ({ ...props }) => {
   return (
      <button className="absolute top-4 right-5 bg-red-100 p-1 rounded text-red-500 border border-red-200 group" {...props}>
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-4 transition-all group-hover:rotate-45">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
         </svg>
      </button>
   )
}

export default ButtonClose