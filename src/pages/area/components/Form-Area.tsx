
import { api } from "@/api";
import { Area, Response } from "@/interface";
import { cleanInput } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState, FormEvent, useEffect } from "react";
import { toast, Toaster } from "sonner";


interface Props {
   fn: () => void,
   updateArea: Area | null
};

const FormArea = ({ fn, updateArea }: Props) => {
   const nombre = useRef<HTMLInputElement | null>(null);
   const descripcion = useRef<HTMLInputElement | null>(null);
   const [errors, setErrors] = useState<{ nombre?: string; descripcion?: string }>({});

   const save = useMutation({
      mutationFn: (data: Area) => api.post("Area/addArea", data),
      onSuccess: (data: Response) => {
         toast.success(`${data.message}`);
         resetAll();
         fn();
      },
      onError: (data: Response) => toast.error(`${data.message}`)
   });

   const update = useMutation({
      mutationFn: (data: Area) => api.put("Area/UpdateArea", data),
      onSuccess: (data: Response) => {
         toast.success(`${data.message}`);
         resetAll();
         fn();
      },
      onError: (data: Response) => toast.error(`${data.message}`)
   });
   
   useEffect(() => {
      if (nombre.current && descripcion.current) {
         nombre.current.value = updateArea?.nombre || "";
         descripcion.current.value = updateArea?.descripcion || "";
      }
   }, []);

   const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      const nombreValue = nombre.current?.value.trim() || "";
      const descripcionValue = descripcion.current?.value.trim() || "";
      if (!nombreValue || !descripcionValue) return toast.error('No puedes enviar datos vacios')
      const area: Area = {
         idArea: updateArea?.idArea || 0,
         activo: updateArea?.activo || true,
         nombre: nombreValue,
         descripcion: descripcionValue,
         alta : new Date().toISOString()
      }
      if (updateArea?.idArea) {
         return update.mutate(area)
      }
      save.mutate(area);
   };

   const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setErrors((prev) => ({
         ...prev,
         [name]: value.trim()
            ? undefined
            : `El campo ${name} es obligatorio.`,
      }));
   };

   const resetAll = () => {
      if (nombre.current && descripcion.current) {
         nombre.current.value = "";
         descripcion.current.value = "";
      }
      setErrors({})
   };



   return (
      <>
         <h2>Registro de Área</h2>
         <p className="text-gray-400 text-xs mt-2 mb-5 border-b border-gray-200 pb-5">
            Es importante que tengas a la mano los datos del área como nombre y descripción.
         </p>

         <form onSubmit={handleSubmit} className="flex flex-col gap-5" autoComplete="off">
            <div className="flex flex-col text-sm text-gray-700 gap-1">
               <label htmlFor="nombre">Área</label>
               <input
                  ref={nombre}
                  onInput={cleanInput}
                  autoComplete="off"
                  placeholder="Ej: Recursos Humanos"
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="w-full bg-gray-50 p-2 rounded-lg border border-gray-200 placeholder:text-xs capitalize"
                  onBlur={handleBlur}
                  maxLength={70}
               />
               {errors.nombre && <span className="text-red-500 text-xs">{errors.nombre}</span>}
            </div>

            <div className="flex flex-col text-sm text-gray-700 gap-1">
               <label htmlFor="descripcion">Descripción</label>
               <input
               autoComplete="off"
                  ref={descripcion}
                  onInput={cleanInput}
                  placeholder="Departamento de Recursos Humanos"
                  type="text"
                  id="descripcion"
                  name="descripcion"
                  className="w-full bg-gray-50 p-2 rounded-lg border border-gray-200 placeholder:text-xs"
                  onBlur={handleBlur}
                  maxLength={150}
               />
               {errors.descripcion && <span className="text-red-500 text-xs">{errors.descripcion}</span>}
            </div>

            <button
               type="submit"
               className="text-sm bg-[#1d3660] text-white p-2 rounded-lg mr-auto mt-4 flex justify-between items-center disabled:opacity-50 gap-5 hover:opacity-85 hover:scale-105"
               disabled={save.isPending}
            >

               {
                  updateArea?.nombre
                     ? 'Guardar datos modificados'
                     : 'Guardar registro'
               }
               {(save.isPending || update.isPending) && (
                  <div className="flex justify-center items-center">
                     <div className="w-5 h-5 border-2 border-t-transparent border-white border-solid rounded-full animate-spin"></div>
                  </div>
               )}
            </button>
         </form>
         <Toaster richColors />
      </>
   );
};

export default FormArea;
