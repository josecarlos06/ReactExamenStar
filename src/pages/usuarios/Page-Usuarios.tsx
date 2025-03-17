import ButtonAdd from "@/components/common/ButtonAdd";
import Table from "@/components/ui/Table";
import { useMemo, useState } from "react";
import FormUsers from "./components/Form-Users";
import ButtonClose from "@/components/common/ButtonClose";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ActionState, Empleado, Response } from "@/interface";
import { api } from "@/api";
import { toast, Toaster } from "sonner";
import ModalAlert from "@/components/ui/ModalAlert";
import DotLoader from "@/components/common/DotLoader";
import { useColumnEmpleado } from "@/hooks/useColumnEmpleado";
import { ColumnDef } from "@tanstack/react-table";
import Search from "@/components/ui/Search";

const PageUsuarios = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [isAction, setIsAction] = useState<ActionState | null>(null);
   const [searchTerm, setSearchTerm] = useState("");
   const [filters, setFilters] = useState(false)
   const { data, isLoading, isFetching, refetch } = useQuery<Response<Empleado[]>>({
      queryKey: ['GetEmpleado'],
      queryFn: () => api.get("Empleado/GetEmpleado"),
   });

   const deleteEmpleado = useMutation({
      mutationFn: (data: { id: number }) => api.delete(`Empleado/DeleteEmpleado/${data.id}`),
      onSuccess: (data: Response) => {
         toast.success(`${data.message}`);
         refetch()
         setIsAction(null)
      },
      onError: (data: Response) => toast.error(`${data.message}`)
   });

   const onClose = () => {
      setIsOpen(false)
   };

   const filteredData = useMemo(() => {
       return (data?.data ?? []).filter((e) =>
         e.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
       );
     }, [data, searchTerm]);

   const columns: ColumnDef<Empleado>[] = useColumnEmpleado(setIsAction, setIsOpen);

   return (
      <section className="m-5 relative">
         <div className="flex items-center justify-between">
            <h2 className="font-medium text-xl text-[#1d3660]">Empleados</h2>
            <ButtonAdd
               text="Agregar usuarios"
               onClick={() => setIsOpen(true)}
            />
         </div>

         <div className="bg-white p-5 border border-gray-200 rounded-lg mt-5 relative overflow-hidden border-t-4 border-t-[#1d3660]">
            {
               (isLoading || isFetching)
                  ? <DotLoader />
                  : <>
                     <Search
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        fn={() => setFilters(!filters)}
                        value={filters}
                     />
                     <Table
                        itemSize={20}
                        columns={columns}
                        active={filters}
                        dataValue={filteredData || []}
                     />
                  </>
            }
         </div>

         {
            isAction?.active && isAction.action === 'delete' &&
            <ModalAlert
               name={isAction.nombre}
               fn={() => setIsAction(null)}
               fnDelete={() => deleteEmpleado.mutate({ id: isAction.idEmpleado })}
               isLoad={deleteEmpleado.isPending}
            />
         }

         {
            isOpen &&
            <div className="fixed top-0 right-0 bottom-0  left-0 bg-white/70 z-[200]">
               <div className="bg-white lg:w-1/4 h-screen p-5 border-l border-gray-200 ml-auto relative">
                  <ButtonClose onClick={() => { setIsAction(null); onClose() }} />
                  <FormUsers
                     actions={isAction}
                     fn={() => { setIsAction(null), refetch() }}
                  />
               </div>
            </div>
         }
         <Toaster richColors />
      </section>

   )
}

export default PageUsuarios
