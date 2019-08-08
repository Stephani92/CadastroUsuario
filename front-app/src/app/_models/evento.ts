import { Data } from '@angular/router';
import { RedeSocial } from './redeSocial';
import { Palestrante } from './palestrante';
import { Lote } from './lote';


export interface Evento {
    id: number;
    tema: string;
    data: Data;
    telefone: string;
    email: string;
    qtdPessoas: number;
    local: string;
    imgUrl: string;
    lotes: Lote[];
    redesSociais: RedeSocial[];
    eventoPalestrantes: Palestrante[];
}
