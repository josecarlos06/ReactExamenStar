import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import DropDownMenu from '@/components/ui/DropDownMenu';
import { stateAction } from '@/interface';
import { Area } from '../interface/index';

type SetIsAction = React.Dispatch<React.SetStateAction<stateAction | null>>

type SetIsOpen = React.Dispatch<React.SetStateAction<boolean>>


const useColumnArea = (setIsAction: SetIsAction, setIsOpen: SetIsOpen): ColumnDef<Area>[] => {
  return useMemo(
    () => [
      {
        accessorKey: 'nombre',
        header: () => <div className="text-start">Area</div>,
        cell: ({ row }) => (
          <div className="flex items-center gap- w-48">
            <div className="flex flex-col items-start">
              <p className="text-gray-700 font-medium text-start capitalize">{row.original.nombre.toLowerCase()}</p>
            </div>
          </div>
        ),
        enableSorting: true,
        size: 170,
      },
      {
        accessorKey: 'descripcion',
        header: () => <span>Descripcion</span>,
        cell: ({ row }) => <p>{row.original.descripcion}</p>,
        size: 350,
      },
      {
        accessorKey: 'cantidadEmpleados',
        header: () => <span>Usuarios</span>,
        cell: ({ row }) => (
          <div className="flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>
            <span>{row.original?.cantidadEmpleados}</span>
          </div>
        ),
      },
      {
        accessorKey: 'Estado',
        header: () => <span>Estado</span>,
        cell: ({ row }) => (
          <p className="border border-green-400/40 bg-green-100/70 text-green-700 py-0.5 rounded-2xl text-xs font-medium">
            {row.original.activo ? 'Activo' : 'Inativo'}
          </p>
        ),
        size: 25,
      },
      {
        accessorKey: 'id',
        header: () => <span>Acciones</span>,
        cell: ({ row }) => (
          <div className="relative">
            <DropDownMenu>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setIsAction({
                      status: false,
                      action: 'update',
                      ...row.original,
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
                      status: true,
                      action: 'delete',
                      ...row.original,
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
    ],
    [setIsAction, setIsOpen]
  );
};

export default useColumnArea;
