import { FormEvent, useRef, useState } from "react";
import { Toaster, toast } from 'sonner';
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../api";
import { Response } from "../../../interface";


const FormArea = () => {
   const nombre = useRef<HTMLInputElement | null>(null);
   const descripcion = useRef<HTMLInputElement | null>(null);
   const [errors, setErrors] = useState<{ nombre?: string; descripcion?: string }>({});

   const save = useMutation({
      mutationFn: (data: Area) => api.post("Area/addArea", data),
      onSuccess: (data: Response) => {
         toast.success(`${data.message}`);
         resetAll()
      },
      onError: (data: Response) => toast.error(`${data.message}`)
   });

   const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      const nombreValue = nombre.current?.value.trim() || "";
      const descripcionValue = descripcion.current?.value.trim() || "";
      if (!nombreValue || !descripcionValue) return toast.error('No puedes enviar datos vacios')
      const area: Area = {
         idArea: 0,
         activo: true,
         nombre: nombreValue,
         descripcion: descripcionValue,
      }
      save.mutate(area);
   };

   const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setErrors((prev) => ({
         ...prev,
         [name]: value.trim() ? undefined : `El campo ${name} es obligatorio.`
      }));
   };

   const resetAll = () => {
      if (nombre.current && descripcion.current) {
         nombre.current.value = "";
      }
      if (descripcion.current) {
         descripcion.current.value = "";
      }
      setErrors({})
   }

   return (
      <div className="bg-white w-1/4 h-screen p-5 border-l border-gray-200 ml-auto">
         <h2>Alta de Área</h2>
         <p className="text-gray-400 text-xs mt-2 mb-5 border-b border-gray-200 pb-5">
            Es importante que tengas a la mano los datos del usuario como nombre, correo electrónico, área asignada y edad.
         </p>

         <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col text-sm text-gray-700 gap-1">
               <label htmlFor="nombre">Área</label>
               <input
                  ref={nombre}
                  placeholder="Ej: Recursos Humanos"
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="w-full bg-gray-50 p-2 rounded-lg border border-gray-200 placeholder:text-xs capitalize"
                  onBlur={handleBlur}
               />
               {errors.nombre && <span className="text-red-500 text-xs">{errors.nombre}</span>}
            </div>

            <div className="flex flex-col text-sm text-gray-700 gap-1">
               <label htmlFor="descripcion">Descripción</label>
               <input
                  ref={descripcion}
                  placeholder="Departamento de Recursos Humanos"
                  type="text"
                  id="descripcion"
                  name="descripcion"
                  className="w-full bg-gray-50 p-2 rounded-lg border border-gray-200 placeholder:text-xs"
                  onBlur={handleBlur}
               />
               {errors.descripcion && <span className="text-red-500 text-xs">{errors.descripcion}</span>}
            </div>

            <button
               type="submit"
               className="text-sm bg-[#1d3660] text-white w-48 p-2 rounded-lg mr-auto mt-4 flex justify-between items-center disabled:opacity-50"
               disabled={save.isPending}
            >
               Guardar Registros
               {save.isPending && (
                  <div className="flex justify-center items-center">
                     <div className="w-5 h-5 border-2 border-t-transparent border-white border-solid rounded-full animate-spin"></div>
                  </div>
               )}
            </button>
         </form>
         <Toaster richColors />
      </div>
   );
};

export default FormArea;
