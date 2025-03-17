import { api } from "@/api";
import Combobox from "@/components/ui/Combobox";
import { Area, Empleado, Response } from "@/interface";
import { cleanInput } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, FormEvent, useRef, useEffect } from "react";
import { toast, Toaster } from "sonner";

interface Props {
   fn: () => void,
   actions: Empleado | null
};

interface Error {
   nombre: string,
   correo: string,
   area: string,
   edad: string,
}


const FormUsers = ({ fn, actions }: Props) => {
   const [selectedTitle, setSelectedTitle] = useState<{ idArea: number; nombre: string; } | null>(null);
   const [errors, setErrors] = useState<Error>({ nombre: "", correo: "", area: "", edad: "" });
   
   const nombre = useRef<HTMLInputElement>(null);
   const correo = useRef<HTMLInputElement>(null);
   const edad = useRef<HTMLSelectElement>(null);

   const { data, isLoading } = useQuery<Response<Area[]>>({
      queryKey: ['GetAreaSearch'],
      queryFn: () => api.get("Area/GetAreaSearch"),
   });

   const save = useMutation({
      mutationFn: (data: Empleado) => api.post("Empleado/saveEmpleado", data),
      onSuccess: (data: Response) => {
         if (data?.status === 500) {
            return toast.error(`${data.message}`);
         }
         toast.success(`${data.message}`);
         resetAll()
         fn();
      },
      onError: (data: Response) => toast.error(`${data.message}`)
   });

   const update = useMutation({
      mutationFn: (data: Empleado) => api.put("Empleado/putEmpleado", data),
      onSuccess: (data: Response) => {
         toast.success(`${data.message}`);
         resetAll();
         fn();
      },
      onError: (data: Response) => toast.error(`${data.message}`)
   });

   useEffect(() => {
      if (nombre.current && correo.current && edad.current) {
         nombre.current.value = actions?.nombre || "";
         correo.current.value = actions?.correoElectronico || "";
         edad.current.value = actions?.edad.toString() || '';
      }
   }, [actions]);

   useEffect(() => {
      if (data?.data && actions?.idArea) {
         const filter = data.data.find(e => e.idArea === actions.idArea);
         if (filter) {
            setSelectedTitle({ idArea: filter.idArea, nombre: filter.nombre });
         }
      }
   }, [data?.data]);


   const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      const nombreValue = nombre.current?.value.trim() || "";
      const correoValue = correo.current?.value.trim() || "";
      const edadVlue = edad.current?.value.trim() || "";

      if (!nombreValue || !correoValue || !edadVlue || !selectedTitle?.idArea) return toast.error('No puedes enviar datos vacios')

      const empleado: Empleado = {
         idEmpleado: actions?.idEmpleado ?? 0,
         nombre: (nombre.current?.value || actions?.nombre) ?? '',
         correoElectronico: (correo.current?.value || actions?.correoElectronico) || "",
         edad: edad.current?.value ? +edad.current.value : 0,
         idArea: selectedTitle?.idArea || 0,
      };

      if (actions?.idArea) {
         return update.mutate(empleado)
      }
      save.mutate(empleado);
   };

   const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name , value } = e.target;
      const validateEmail = name === "correo" && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(value);

      setErrors(prev => ({
         ...prev,
         [ name ] : value.trim() ? (validateEmail ? "El Correo no válido." : "") : `El campo ${name} es obligatorio.`,
      }));
   };

   
   const resetAll = () => {
      if (nombre.current && correo.current && edad.current) {
         nombre.current.value = "";
         correo.current.value = "";
         edad.current.value = "";
         setSelectedTitle(null)
         setErrors({ nombre: "", correo: "", area: "", edad: "" })
      }
   };




   return (
      <>
         <h2>Registro de Empleados</h2>
         <p className="text-gray-400 text-xs mt-2 mb-5 border-b border-gray-200 pb-5">
            Es importante que tengas a la mano los datos del usuario como nombre, correo electronico, area asignada y edad.
         </p>

         <form onSubmit={handleSubmit} className="flex flex-col gap-5" autoComplete="off">
            <div className="flex flex-col text-sm text-gray-700 gap-1">
               <label htmlFor="nombre">Nombre</label>
               <input
                  ref={nombre}
                  placeholder="Juan jesus"
                  type="text"
                  id="nombre"
                  name="nombre"
                  onBlur={handleBlur}
                  onInput={cleanInput}
                  className="w-full bg-gray-50 p-2 rounded-lg border border-gray-200 placeholder:text-xs capitalize"
               />
               {errors.nombre && <span className="text-red-500 text-xs">{errors.nombre}</span>}
            </div>

            <div className="flex flex-col text-sm text-gray-700 gap-1">
               <label htmlFor="correo">Correo electronico</label>
               <input
                  ref={correo}
                  placeholder="ejemplo@gmail.com"
                  type="email"
                  id="correo"
                  name="correo"
                  required
                  onBlur={handleBlur}
                  pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                  title="Ingrese un correo válido (ejemplo: usuario@dominio.com)"
                  className="w-full bg-gray-50 p-2 rounded-lg border border-gray-200 placeholder:text-xs"
               />
               {errors.correo && <span className="text-red-500 text-xs">{errors.correo}</span>}
            </div>

            <div className="flex gap-2 relative w-full">
               <div className="flex flex-1 flex-col w-full text-sm text-gray-700 gap-1">
                  <label htmlFor="edad">Edad</label>
                  <select
                     onBlur={handleBlur}
                     name="edad"
                     id="edad"
                     ref={edad}
                     className="w-20 bg-gray-50 p-2 rounded-lg border border-gray-200 placeholder:text-xs capitalize"
                  >
                     {new Array(63).fill(null).map((_, index) => (
                        <option key={index} value={18 + index}>
                           {18 + index}
                        </option>
                     ))}
                  </select>
                  {errors.edad && <span className="text-red-500 text-xs">{errors.edad}</span>}
               </div>

               <div className="flex flex-col  text-sm text-gray-700 gap-1 w-full">
                  <label htmlFor="Area">Área</label>
                  <Combobox
                     fn={() => setErrors(prev => ({
                        ...prev,
                        area: selectedTitle?.idArea == null ? 'El campo area es obligatorio.' : ' '
                     }))}
                     value={selectedTitle}
                     options={data?.data || []}
                     loading={isLoading}
                     getOptionLabel={(option: { idArea: number; nombre: string }) => option.nombre}
                     setValue={setSelectedTitle}
                     placeholder="Buscar área"
                  />
                  {errors.area && <span className="text-red-500 text-xs">{errors.area}</span>}
               </div>

            </div>

            <button
               type="submit"
               className="text-sm bg-[#1d3660] text-white p-2 rounded-lg mr-auto mt-4 flex justify-between items-center disabled:opacity-50 gap-5 hover:opacity-85 hover:scale-105"
               disabled={save.isPending}
            >

               {
                  actions?.idEmpleado
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

export default FormUsers;
