import LoaderCircle from "../common/LoaderCircle"

const ModalAlert = ( { name, fn, fnDelete, isLoad } : {name : string, fn : () => void,  fnDelete : () => void ,isLoad  : boolean }) => {
   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50">
         <div className="bg-white border p-5 rounded-lg  border-gray-200 lg:w-[25rem] shadow-lg">

            <h2 className="mb-4 text-xl font-semibold text-[#1d3660]">Confirmar eliminación</h2>
            <p className="mb-4 text-gray-500 text-sm overflow-hidden">¿Estás seguro que deseas eliminar este elemento 
               <span className="font-semibold underline text-red-400 px-2"> {name} </span> ? Esta acción no se puede deshacer.</p>

            <div className="flex justify-end space-x-3">
               <button
                  onClick={fn}
                  disabled={isLoad}
                  className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
               >
                  Cancelar
               </button>
               <button
                  disabled={isLoad}
                  onClick={fnDelete}
                  className="rounded-md bg-red-600 flex items-center gap-2 justify-center px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
               >
                  Eliminar
                  {
                     isLoad && <LoaderCircle color="white"/>
                  }
               </button>
            </div>
         </div>
      </div>
   )
}

export default ModalAlert