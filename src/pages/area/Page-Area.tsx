import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import ButtonAdd from "../../components/ButtonAdd";
import DropDownMenu from "../../components/DropDownMenu";
import Table from "../../components/Table";
import { abecedarioUIColores } from "../../utils";
import FormArea from "./components/Form-Area";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api";
import { Area, Response } from "../../interface";


interface ActionDelete {
  status: Boolean,
  id: Number
}

const PageArea = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState<ActionDelete | null>(null)

  const { data, isLoading, isFetching } = useQuery<Response<Area[]>>({
    queryKey: ['GetArea'],
    queryFn: () => api.get("Area/GetArea"),
  });

  const columns: ColumnDef<Area>[] = [
    {
      accessorKey: 'nombre',
      header: () => <div className="text-start">Nombre</div>,
      cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full flex items-center justify-center text-white" style={{ background: abecedarioUIColores[row.original.nombre.charAt(0).toUpperCase() as keyof typeof abecedarioUIColores] }}>

          </div>
          <div className="flex flex-col items-start">
            <span className="text-gray-700 font-medium">{row.original.nombre}</span>
          </div>
        </div>
      ),
      size: 110
    },
    {
      accessorKey: 'descripcion',
      header: () => <span >Descripcion</span>,
      cell: ({ row }) => <p>{row.original.descripcion}</p>,
      size: 550
    },
    /*  {
       accessorKey: 'Usuarios',
       header: () => <span >Usuarios</span>,
       cell: ({ row }) =>
         <div className="flex items-center justify-center gap-2">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-4">
             <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
           </svg>
           <span>
             {row.original.numeroUsuarios}
           </span>
         </div>,
     }, */
    {
      accessorKey: 'Estado',
      header: () => <span >Estado</span>,
      cell: ({ row }) => <p className="border border-green-400/40 bg-green-100/70 text-green-700 py-0.5 rounded-2xl text-xs font-medium">{row.original.activo ? 'Activo' : 'Inativo'}</p>,
      size: 25
    },
    {
      accessorKey: 'id',
      header: () => <span>Acciones</span>,
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
              <button onClick={() => setIsDelete({
                status: true,
                id: row.original.idArea
              })} className="flex gap-5 items-center text-sm text-red-400 hover:bg-gray-100/80 px-3 py-1 rounded font-medium">
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
  ];

  const deleteArea = (id: number) => {

  }

  return (
    <section className="m-5 relative">
      <div className="flex items-center justify-between">
        <h2 className="font-medium text-xl text-[#1d3660]">Areas</h2>
        <ButtonAdd
          text="Agregar areas"
          onClick={() => setIsOpen(true)}
        />
      </div>

      {
        isLoading || isFetching
          ? <>Cargando  dasdasdsa</>
          : <div className="bg-white p-5 border border-gray-200 rounded-lg mt-5 relative overflow-hidden border-t-4 border-t-[#1d3660]">
            <Table
              itemSize={10}
              columns={columns}
              dataValue={data?.data || []}
            />
          </div>

      }

      {
        isDelete?.status &&
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-24 bg-white border border-red-500 rounded-lg shadow-xl flex flex-col items-center justify-center space-y-3 p-4">
          <div className="flex items-center justify-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-red-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <div className="text-center">
              <p className="text-red-500 font-semibold text-lg">¡Atención!</p>
              <p className="text-gray-700 text-sm">¿Estás seguro de eliminar este elemento?</p>
            </div>
          </div>
          <div className="flex space-x-4 mt-4">
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all">Eliminar</button>
            <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all">Cancelar</button>
          </div>
        </div>
      }


      {
        isOpen &&
        <div className="fixed top-0 right-0 bottom-0  left-0 bg-white/70">
          <FormArea />
        </div>
      }
    </section>
  )
}

export default PageArea