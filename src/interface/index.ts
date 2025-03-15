export interface Response<T = any>{
   status  : number,
   message : string,
   data ?   : T
}

export interface Area {
   idArea: number;
   activo: number;
   nombre: string;
   descripcion: string | null; // Si la descripción puede ser null o undefined
};
