import { RedeSocial } from './redeSocial';

export interface Palestrante {
    id: number;
    nome: string;
    miniCrriculo: string;
    imagemUrl: string;
    telefone: string;
    email: string;
    redesSociais: RedeSocial[];
}
