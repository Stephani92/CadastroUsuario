import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../_models/evento';
import { IntDto } from '../_models/Dtos/IntDto';
import { Job } from '../_models/Job';


@Injectable({
  providedIn: 'root'
})
export class EventoService {
  baseURL = 'http://localhost:5000/api/evento';

  constructor(private http: HttpClient) { }

  getAllEvento(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.baseURL);
  }

  getEventoByTema(tema: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.baseURL}/getByTema/${tema}`);
  }

  getEventoById(Id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.baseURL}/${Id}`);
  }

  postEvento(evento: Evento) {
    return this.http.post(this.baseURL, evento);
  }
  
  postUpload(file: File, name: string) {
    const fileToUpload = file[0] as File;
    const formData = new FormData();
    formData.append('file', fileToUpload, name);

    return this.http.post(`${this.baseURL}/upload`, formData);
  }

  putEvento(evento: Evento) {
    return this.http.put(`${this.baseURL}/${evento.id}`, evento);
  }

  deleteEvento(evento: Evento) {
    return this.http.delete(`${this.baseURL}/${evento.id}`);
  }
}
