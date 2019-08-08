import { Component, OnInit } from '@angular/core';
import { EventoService } from '../_services/evento.service';
import { Evento } from '../_models/evento';

@Component({
  selector: 'app-eventos',
  templateUrl: './Eventos.component.html',
  styleUrls: ['./Eventos.component.css']
})
export class EventosComponent implements OnInit {

  eventos: Evento[];
  even: Evento[];
  constructor(private eventoService: EventoService) { }

  ngOnInit() {
    this.getEventos();
  }

  getEventos() {
      this.eventoService.getAllEvento().subscribe(( eventos: Evento[]) => {
        this.eventos = eventos;
        console.log(this.eventos);
    }, error => {
      console.log(error);
    });
  }
}
