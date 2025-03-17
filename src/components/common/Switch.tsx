const Switch = ({onClick, checked } : {
   checked?    : boolean,
   onClick? : () => void
}) => {
   return (
       <label className="relative inline-flex gap-2 items-center cursor-pointer">
           <input
               type="checkbox"
               onClick={onClick}
               checked={checked}
               readOnly
               className="sr-only peer"
           />
           <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-focus:ring-4  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[5px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all  peer-checked:bg-blue-600" />

       </label>
   )
}

export default Switch