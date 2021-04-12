import { IEstado } from "./estado.model";
import { ITipoIdentificacion } from "./tipoIdentificacion.model";

export interface IPersona{
    codigo?: number;
    nombre?: string;
    apellido?: string;
    fechaNacimiento?: Date;
    userName?: string;
    password?: string;
    identificacion?: number;
    tipoIdentificacion?: ITipoIdentificacion;
    estado?: IEstado;
} 

export class Persona implements IPersona {
    constructor(
        public codigo?: number,
        public nombre?: string,
        public apellido?: string,
        public fechaNacimiento?: Date,
        public userName?: string,
        public password?: string,
        public identificacion?: number,
        public tipoIdentificacion?: ITipoIdentificacion,
        public estado?: IEstado
        ) {}
}

export function getPersonaIdentifier(persona: IPersona): number | undefined {
    return persona.codigo;
}