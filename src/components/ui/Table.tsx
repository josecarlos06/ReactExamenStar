import {
   ColumnDef,
   flexRender,
   getCoreRowModel,
   getPaginationRowModel,
   useReactTable,
} from "@tanstack/react-table";
import { useState, useMemo } from "react";

interface Props<T> {
   itemSize?: number;
   columns: ColumnDef<T>[];
   dataValue: T[];
   active?: boolean;
}

const Table = <T extends unknown>({ itemSize = 10, columns, dataValue, active = false }: Props<T>) => {
   const [filters, setFilters] = useState<Record<string, string>>({});
   const [pageSize, setPageSize] = useState(itemSize);

   const handleFilterChange = (columnId: string, value: string) => {
      setFilters((prevFilters) => ({
         ...prevFilters,
         [columnId]: value,
      }));
   };

   const filteredData = useMemo(() => {
      return dataValue.filter((row) => {
         return columns.every((column) => {
            // @ts-ignore
            const columnId = column.id || column.accessorKey as string;
            const filterValue = filters[columnId]?.toLowerCase() || "";
            // @ts-ignore
            const cellValue = String(row[column.accessorKey as keyof T] || "").toLowerCase();

            return cellValue.includes(filterValue);
         });
      });
   }, [filters, dataValue, columns]);

   const table = useReactTable({
      data: filteredData,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      initialState: {
         pagination: {
            pageSize: pageSize, 
         },
      },
   });

   const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newSize = Number(e.target.value);
      setPageSize(newSize);
      table.setPageSize(newSize);
   };

   return (
      <div className="w-full">
         <div className="overflow-x-auto w-full border border-gray-200 rounded-lg">
            <table className="w-full table-auto ">
               <thead className="border-b border-gray-200">
                  {table.getHeaderGroups().map((headerGroup) => (
                     <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                           const columnId = header.id;

                           return (
                              <th
                                 key={header.id}
                                 className="px-4 py-3 text-center text-sm font-normal text-gray-500"
                                 style={{ width: `${header.column.columnDef.size}rem` }}
                              >
                                 {header.isPlaceholder ? null : (
                                    <>
                                       <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                                       {active && (
                                          <input
                                             type="text"
                                             className="mt-1 px-2 py-1 text-gray-600 bg-gray-100 border border-gray-300 rounded-lg text-sm w-full placeholder:text-xs"
                                             placeholder="Buscar ..."
                                             value={filters[columnId] || ""}
                                             onChange={(e) =>
                                                handleFilterChange(columnId, e.target.value)
                                             }
                                          />
                                       )}
                                    </>
                                 )}
                              </th>
                           );
                        })}
                     </tr>
                  ))}
               </thead>
               <tbody className=" text-center bg-white ">
                  {table.getRowModel().rows.map((row) => (
                     <tr key={row.id} className="transition-all hover:bg-gray-100 even:bg-gray-50">
                        {row.getVisibleCells().map((cell) => (
                           <td
                              key={cell.id}
                              className="px-3 py-3 border-t border-gray-200 text-sm text-gray-700"
                           >
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                           </td>
                        ))}
                     </tr>
                  ))}
               </tbody>
            </table>
            {filteredData.length === 0 && (
               <p className="text-center text-gray-600 text-sm py-11 mr-28">No hay datos para mostrar.</p>
            )}
         </div>
         <div className="h-4" />

         <div className="flex items-center justify-between mt-2">
            <div>
               <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="text-xs text-gray-500">
                     Mostrando {table.getRowModel().rows.length} de {filteredData.length} registros
                  </span>

                  <select
                     value={pageSize}
                     onChange={handlePageSizeChange}
                     className="p-1.5 border border-gray-300 rounded"
                  >
                     <option value={5}>5</option>
                     <option value={10}>10</option>
                     <option value={25}>25</option>
                     <option value={50}>50</option>
                     <option value={100}>100</option>
                  </select>
               </div>
            </div>

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
