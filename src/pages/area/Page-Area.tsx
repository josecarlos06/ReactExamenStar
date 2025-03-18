import ButtonAdd from "@/components/common/ButtonAdd";
import ButtonClose from "@/components/common/ButtonClose";
import DotLoader from "@/components/common/DotLoader";
import ModalAlert from "@/components/ui/ModalAlert";
import Table from "@/components/ui/Table";
import { Area, Response, stateAction } from "@/interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { toast, Toaster } from "sonner";
import FormArea from "./components/Form-Area";
import { api } from "@/api";
import useColumnArea from "@/hooks/useColumnArea";
import Search from "@/components/ui/Search";



const PageArea = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAction, setIsAction] = useState<stateAction | null>(null)
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState(false)

  const { data, isLoading, isFetching, refetch } = useQuery<Response<Area[]>>({
    queryKey: ['GetArea'],
    queryFn: () => api.get("Area/GetArea"),
  });

  const deleteItem = useMutation({
    mutationFn: (data: { id: number }) => api.delete(`Area/DeleteArea/${data.id}`),
    onSuccess: (data: Response) => {
      setIsAction(null);
      if (data?.status === 404) {
        return toast.error(`${data.message}`);
      }
      toast.success(`${data.message}`);
      refetch()
    },
    onError: (data) => {
      toast.error(`${data.message}`)
    }
  });

  const columns: ColumnDef<Area>[] = useColumnArea(setIsAction, setIsOpen);

  const onClose = () => {
    setIsOpen(false)
    setIsAction(null)
  }

  const filteredData = useMemo(() => {
    return (data?.data ?? []).filter((e) =>
      e.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

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
          ? <DotLoader />
          :
          <div className="bg-white p-5 border border-gray-200 rounded-lg mt-5 relative overflow-hidden border-t-4 border-t-[#1d3660]">
            <Search
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              fn={()=>setFilters(!filters)}
              value={filters}
            />
            <Table
              active={filters}
              itemSize={5}
              columns={columns}
              dataValue={filteredData || []}
            />
          </div>
      }

      {isAction && isAction?.status && isAction?.action === 'delete' &&
        <ModalAlert
          name={isAction.nombre}
          fn={() => setIsAction({ ...isAction, status: false, action: 'delete' })}
          fnDelete={() => deleteItem.mutate({ id: isAction.idArea })}
          isLoad={deleteItem.isPending}
        />
      }

      {
        isOpen &&
        <div className="fixed top-0 right-0 bottom-0  left-0 bg-white/70 z-[200]">
          <div className="bg-white lg:w-1/4 h-screen p-5 border-l border-gray-200 ml-auto relative">
            <ButtonClose onClick={onClose} />
            <FormArea
              updateArea={isAction}
              fn={() => { setIsAction(null); refetch() }}
            />
          </div>
        </div>
      }
      <Toaster richColors />
    </section>
  )
}

export default PageArea
