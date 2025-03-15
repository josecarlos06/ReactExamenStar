import { ColumnDef } from "@tanstack/react-table";
import Table from "../../components/Table"
import { abecedarioUIColores } from "../../utils";
import DropDownMenu from "../../components/DropDownMenu";
import ButtonAdd from "../../components/ButtonAdd";
import { useState } from "react";
import FormUsers from "./components/Form-Users";

type Person = {
   id: number;
   nombre: string;
   correo: string;
   edad: number;
   area: string;
   alta: string;
};

const defaultData: Person[] = [
   { id: 1, nombre: "jose carlos medina vasquez", correo: "carlos@gmail.com", edad: 24, area: "Finanzas", alta: "123981209" },
   { id: 2, nombre: "Eduardo medina vasquez", correo: "carlos@gmail.com", edad: 24, area: "Finanzas", alta: "123981209" },
   { id: 3, nombre: "Lucia vasquez perez", correo: "carlos@gmail.com", edad: 24, area: "Finanzas", alta: "123981209" },
];


const columns: ColumnDef<Person>[] = [
   {
      accessorKey: 'nombre',
      header: () => <div className="text-start">Nombre</div>,
      cell: ({ row }) => (
         <div className="flex items-center gap-10">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ background: abecedarioUIColores[row.original.nombre.charAt(0).toUpperCase() as keyof typeof abecedarioUIColores] }}>
               {row.original.nombre.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col items-start">
               <span className="text-gray-700 font-medium">{row.original.nombre}</span>
               <span className="text-xs text-gray-500">{row.original.correo}</span>
            </div>
         </div>
      ),
      size: 140
   },
   {
      accessorKey: 'edad',
      header: () => <span >Edad</span>,
      cell: ({ row }) => <p>{row.original.edad} Años</p>,
   },
   {
      accessorKey: 'area',
      header: () => <span >Area</span>,
   },
   {
      accessorKey: 'alta',
      header: () => <span >Alta</span>,
   },
   {
      accessorKey: 'id',
      header: () => <span>Nombre</span>,
      cell: ({ row }) => (

         <div className="relative">
            <DropDownMenu>
               <div className="flex flex-col gap-2">
                  <button className="flex gap-5 items-center text-sm text-gray-600 hover:bg-gray-100/80 px-3 py-1 rounded font-medium">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                     </svg>

                     Editar
                  </button>
                  <hr className="border-b border-gray-200" />
                  <button className="flex gap-5 items-center text-sm text-red-400 hover:bg-gray-100/80 px-3 py-1 rounded font-medium">
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
]

const PageUsuarios = () => {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <section className="m-5">
         <div className="flex items-center justify-between">
            <h2 className="font-medium text-xl text-[#1d3660]">Usuarios</h2>
            <ButtonAdd
               text="Agregar usuarios"
               onClick={() => setIsOpen(true)}
            />
         </div>

         <div className="bg-white p-5 border border-gray-200 rounded-lg mt-5 relative overflow-hidden border-t-4 border-t-[#1d3660]">
            <Table
               itemSize={20}
               columns={columns}
               dataValue={defaultData}
            />
         </div>

         {
            isOpen &&
            <div className="fixed top-0 right-0 bottom-0  left-0 bg-white/70">
               <FormUsers/>
            </div>
         }
      </section>

   )
}

export default PageUsuarios
