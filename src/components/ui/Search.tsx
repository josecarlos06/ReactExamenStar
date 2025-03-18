import { ChangeEvent } from "react"
import DropDownMenu from "./DropDownMenu"
import Switch from "../common/Switch"

interface Props {
   searchTerm: string,
   setSearchTerm: React.Dispatch<React.SetStateAction<string>>,
   fn: () => void,
   value : boolean 
}

const Search = ({ searchTerm, setSearchTerm, fn, value }: Props) => {
   return (
      <div className="flex items-center justify-between mb-3">
         {
            !value && 
            <div className="relative  w-full max-w-xs">
               <input
                  value={searchTerm}
                  disabled={value}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                  placeholder="Buscar"
                  type="text"
                  className="w-full bg-gray-100 border border-gray-200 rounded-lg text-sm p-2 pl-8 pr-10 placeholder:text-xs "
               />
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="absolute left-1.5 top-1/2 transform -translate-y-1/2 size-5 text-gray-400"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
               </svg>
            </div>
         }

         <div className="ml-auto flex items-center justify-center">
            <DropDownMenu type={true}>
               <>
                  <h3 className="text-sm text-gray-500 text-start mb-5 pb-2 border-b border-gray-200">Acciones</h3>
                  <div className="flex gap-2 items-center justify-between w-32">
                     <p className="text-sm text-gray-600 font-medium">Filtros</p>
                     <Switch
                        checked={value}
                        onClick={fn}
                     />
                  </div>
               </>
            </DropDownMenu>
         </div>
      </div>
   )
}

export default Search