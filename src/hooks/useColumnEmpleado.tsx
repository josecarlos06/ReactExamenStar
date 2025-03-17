import DropDownMenu from "@/components/ui/DropDownMenu";
import { ActionState, Empleado } from "@/interface";
import { abecedarioUIColores } from "@/utils";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

type SetIsAction = React.Dispatch<React.SetStateAction<ActionState | null>>

type SetIsOpen = React.Dispatch<React.SetStateAction<boolean>>

export const useColumnEmpleado = (setIsAction: SetIsAction, setIsOpen: SetIsOpen): ColumnDef<Empleado>[] => {
   return useMemo(() => [
      {
         accessorKey: "nombre",
         header: () => <div className="text-start">Nombre</div>,
         cell: ({ row }) => (
            <div className="flex items-center gap-4 w-72">
               <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                  style={{
                     background:
                        abecedarioUIColores[row.original.nombre.charAt(0).toUpperCase() as keyof typeof abecedarioUIColores],
                  }}
               >
                  {row.original.nombre.charAt(0).toUpperCase()}
               </div>
               <div className="flex flex-col items-start">
                  <span className="text-gray-700 font-medium">{row.original.nombre}</span>
                  <span className="text-xs text-gray-500">{row.original.correoElectronico}</span>
               </div>
            </div>
         ),
         size: 140,
      },
      {
         accessorKey: "edad",
         header: () => <span>Edad</span>,
         cell: ({ row }) => <p>{row.original.edad} Años</p>,
      },
      {
         accessorKey: "area",
         header: () => <span>Área</span>,
      },
      {
         accessorKey: "idEmpleado",
         header: () => <span>Acción</span>,
         cell: ({ row }) => (
            <div className="relative">
               <DropDownMenu>
                  <div className="flex flex-col gap-2">
                     <button
                        onClick={() => {
                           setIsAction({
                              ...row.original,
                              active: false,
                              action: "update",
                           });
                           setIsOpen(true);
                        }}
                        className="flex gap-5 items-center text-sm text-gray-600 hover:bg-gray-100/80 px-3 py-1 rounded font-medium"
                     >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-4">
                           <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>

                        Editar
                     </button>
                     <hr className="border-b border-gray-200" />
                     <button
                        onClick={() =>
                           setIsAction({
                              ...row.original,
                              active: true,
                              action: "delete",
                           })
                        }
                        className="flex gap-5 items-center text-sm text-red-400 hover:bg-gray-100/80 px-3 py-1 rounded font-medium"
                     >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-4">
                           <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>

                        Eliminar
                     </button>
                  </div>
               </DropDownMenu>
            </div>
         ),
      },
   ], [])


};
