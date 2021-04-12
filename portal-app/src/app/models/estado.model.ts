
export interface IEstado {
    codigo?: number;
	nombre?: string;
	fechaCreacion?: Date;
	usuarioCreacion?: string;
	fechaModificacion?: Date | null;
	usuarioModificacion?: string | null;
}
  
export class Estado implements IEstado {
    constructor(
        public codigo?: number,
        public nombre?: string,
        public fechaCreacion?: Date,
        public usuarioCreacion?: string,
        public fechaModificacion?: Date | null,
        public usuarioModificacion?: string | null
        ) {}
}
  
export function getEstadoIdentifier(estado: IEstado): number | undefined {
    return estado.codigo;
}