import { Procedimento } from './procedimento';
export interface Clinica {
    name: string;
    cnpj: string;
    endereco: string;
    cidade: string;
    estado: string;
    especialidades: string[];
    procedimentos: Procedimento[];
}
