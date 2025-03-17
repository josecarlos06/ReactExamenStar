export interface Response<T = any>{
   status  : number,
   message : string,
   data ?   : T
}

export interface Area {
   idArea: number;
   activo: boolean;
   nombre: string;
   cantidadEmpleados ?: number
   descripcion: string | null; 
};


export interface stateAction extends Area {
  status: Boolean
  action: 'delete' | 'update'
}


export interface ActionState extends Empleado {
   active: boolean,
   action: 'delete' | 'update',

}

export interface Empleado {
   idEmpleado: number;   
   nombre: string;
   edad: number;
   correoElectronico: string;
   idArea: number;
}