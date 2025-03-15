import { FormEvent, useState } from "react";
import Combobox from "../../../components/Combobox";
import { Toaster, toast } from 'sonner'

const options = [
   { title: 'The Shawshank Redemption' },
   { title: 'The Godfather' },
   { title: 'The Dark Knight' },
];

const FormUsers = () => {
   const [isLoading, setIsLoading] = useState<boolean>(false)

   const handleSubmit = (e: FormEvent) => {
      e.preventDefault()
      setIsLoading(true)
      toast.success('Se creo el usuario con exito')
   }

   return (
      <div className=" bg-white w-1/4 h-screen p-5 border-l border-gray-200 ml-auto">
         <h2>Alta de Empleaados</h2>
         <p className="text-gray-400 text-xs mt-2 mb-5 border-b border-gray-200 pb-5">
            Es importante que tengas a la mano los datos del usuario como nombre, correo electronico, area asignada y edad.
         </p>

         <form action="" className="flex flex-col gap-5">
            <div className="flex flex-col text-sm text-gray-700 gap-1">
               <label htmlFor="nombre" className="">Nombre</label>
               <input
                  placeholder="Juan jesus"
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="w-full bg-gray-50 p-2 rounded-lg border border-gray-200 placeholder:text-xs capitalize"
               />
            </div>

            <div className="flex flex-col text-sm text-gray-700 gap-1">
               <label htmlFor="correo" className="">Correo electronico</label>
               <input
                  placeholder="ejemplo@gmail.com"
                  type="text"
                  id="correo"
                  name="correo"
                  className="w-full bg-gray-50 p-2 rounded-lg border border-gray-200 placeholder:text-xs"
               />
            </div>

            <div className="flex gap-2 w-full">
               <div className="flex flex-col text-sm text-gray-700 gap-1">
                  <label htmlFor="edad" className="">Edad</label>
                  <input
                     placeholder="20"
                     type="edad"
                     name="edad"
                     className="w-12 bg-gray-50 p-2 rounded-lg border border-gray-200 placeholder:text-xs capitalize"
                  />
               </div>

               <div className="flex flex-col text-sm text-gray-700 gap-1 w-full">
                  <label htmlFor="Area" className="">Area</label>
                  <Combobox
                     label="Select a movie"
                     options={options}
                     loading={false}
                  />
               </div>
            </div>

            <button
               onClick={handleSubmit}
               className="text-sm bg-[#1d3660] text-white w-48 p-2 rounded-lg mr-auto mt-4 flex justify-between items-center"
            >
               Guardar Registros
               {
                  isLoading && <div className="flex justify-center items-center">
                     <div className="w-5 h-5 border-2 border-t-transparent border-white border-solid rounded-full animate-spin"></div>
                  </div>
               }
            </button>
         </form>
         <Toaster richColors />
      </div>
   )
}

export default FormUsers