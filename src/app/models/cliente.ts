import { Responsavel } from './responsavel';
export interface Cliente {
    nome: string;
    cpf: string;
    dataNascimento: string;
    endereco: string;
    estado: string;
    cidade: string;
    rg: string;
    responsavel: any;
}
