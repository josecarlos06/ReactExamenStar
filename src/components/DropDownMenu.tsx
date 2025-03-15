import { Menu, MenuButton, MenuItems } from "@headlessui/react"
import { ReactNode } from "react"


interface DropDownMenuProps {
  children: ReactNode;
}

const DropDownMenu = ({ children }: DropDownMenuProps) => {
   return (
      <Menu>
         <MenuButton>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>

         </MenuButton>
         <MenuItems anchor="bottom" className="bg-white px-2 py-2 border border-gray-200 rounded-lg">
            {children}
         </MenuItems>
      </Menu>
   )
}

export default DropDownMenu