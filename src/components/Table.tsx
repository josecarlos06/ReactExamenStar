import {
   ColumnDef,
   flexRender,
   getCoreRowModel,
   getPaginationRowModel,
   useReactTable,
} from "@tanstack/react-table";
import React from "react";



interface Props<T> {
   itemSize?: number;
   columns: ColumnDef<T>[];
   dataValue : T[]
 }

const Table = <T extends unknown>({ itemSize = 10, columns, dataValue }: Props<T>) => {
   const [data] = React.useState(() => [...dataValue]);

   const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      initialState: {
         pagination: {
            pageSize: itemSize,
         },
      },
   });

   return (
      <div className="w-full">
         <div className="overflow-x-auto w-full border border-gray-200 rounded-lg">
            <table className="w-full table-auto">
               <thead className="border-b border-gray-200">
                  {table.getHeaderGroups().map((headerGroup) => (
                     <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                           <th
                              key={header.id}
                              className="px-4 py-3 text-center text-sm font-normal text-gray-500"
                              style={{ width: `${header.column.columnDef.size}rem` }}
                           >
                              {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                           </th>
                        ))}
                     </tr>
                  ))}
               </thead>
               <tbody className="bg-white text-center">
                  {table.getRowModel().rows.map((row) => (
                     <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                           <td key={cell.id} className="px-3 py-3 border-t border-gray-200 text-sm text-gray-700">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                           </td>
                        ))}
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         <div className="h-4" />
         <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-500">
               Mostrando {table.getRowModel().rows.length} de {data.length} registros
            </span>
            <div className="flex items-center gap-3 text-gray-500 text-xs">
               <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="p-1.5 border border-gray-300 bg-gray-50 rounded disabled:opacity-50"
               >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-4">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                  </svg>
               </button>

               <span>
                  Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
               </span>

               <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="p-1.5 border border-gray-300 bg-gray-50 rounded disabled:opacity-50"
               >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-4">
                     <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
               </button>
            </div>
         </div>
      </div>
   );
};

export default Table;
