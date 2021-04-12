
export interface ITipoIdentificacion {
    codigo?: number;
	nombre?: string;
	fechaCreacion?: Date;
	usuarioCreacion?: string;
	fechaModificacion?: Date | null;
	usuarioModificacion?: string | null;
}
  

export class TipoIdentificacion implements ITipoIdentificacion {
    constructor(
        public codigo?: number,
        public nombre?: string,
        public fechaCreacion?: Date,
        public usuarioCreacion?: string,
        public fechaModificacion?: Date | null,
        public usuarioModificacion?: string | null
        ) {}
}
  
export function getTipoIdentificacionIdentifier(tipoIdentificacion: ITipoIdentificacion): number | undefined {
    return tipoIdentificacion.codigo;
}