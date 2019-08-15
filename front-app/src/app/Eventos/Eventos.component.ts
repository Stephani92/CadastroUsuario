import { Component, OnInit } from '@angular/core';
import { EventoService } from '../_services/evento.service';
import { Evento } from '../_models/evento';
import { defineLocale, BsLocaleService, ptBrLocale } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-eventos',
  templateUrl: './Eventos.component.html',
  styleUrls: ['./Eventos.component.css']
})
export class EventosComponent implements OnInit {

  eventos: Evento[];
  evento: Evento;
  FiltroLista: '';
  registerForm: FormGroup;
  test: Evento;

  modolSalvar = '';
  bodyDeletarEvento = '';


  constructor(
    private eventoService: EventoService,
    private fb: FormBuilder,
    private localeService: BsLocaleService
    ) {
        this.localeService.use('pt-br');
     }

  ngOnInit() {
    this.getEventos();
    this.validation();
  }

  getEventos() {
      this.eventoService.getAllEvento().subscribe(( eventos: Evento[]) => {
        this.eventos = eventos;
        console.log(this.eventos);
    }, error => {
      console.log(error);
    });
  }

  getEventosByTema(tema: string) {
      this.eventoService.getEventoByTema(tema).subscribe(( eventos: Evento[]) => {
        this.eventos = eventos;
        console.log(this.eventos);
    }, error => {
      console.log(error);
    });
  }

  getEventosById(id: number) {
      this.eventoService.getEventoById(id).subscribe(( eventos: Evento) => {
        this.evento = eventos;
        console.log(this.evento);
    }, error => {
      console.log(error);
    });
  }
  // abrir modal
  openModal(template: any) {
    this.registerForm.reset();
    template.show();
  }
  // validaçao do formulario
  validation() {
    this.registerForm = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', Validators.required],
      data: ['', Validators.required],
      imgUrl: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(800)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]

    });
  }
  // editar evento
  editEvento(template: any, evento: Evento) {
    this.modolSalvar = 'put';
    this.openModal(template);
    this.evento = evento;
    this.registerForm.patchValue(evento);
  }

  excluirEvento(evento: Evento, template: any) {
    this.openModal(template);
    this.evento = evento;
    this.bodyDeletarEvento = `Tem certeza que deseja excluir o Evento: ${evento.tema}, Código: ${evento.id}`;
  }

  confirmeDelete() {
    console.log(this.evento);
    this.eventoService.deleteEvento(this.evento).subscribe(
      () => {
        this.getEventos();
      }, error => {
        console.log(error);
      }
    );
  }

  salvarAlteracoes(template: any) {
    if (this.registerForm.valid) {
      if (this.modolSalvar === 'put') {
        this.evento = Object.assign({id: this.evento.id}, this.registerForm.value);
        console.log(this.evento);
        this.eventoService.putEvento(this.evento).subscribe(
          () => {
            this.getEventos();
          }, error => {
            console.log(error);
          }
        );
      } else {
        this.evento = Object.assign({}, this.registerForm.value);
        this.eventoService.postEvento(this.evento).subscribe(
          (novoEvento: Evento) => {
            console.log(novoEvento);
            template.hide();
            this.getEventos();
          }, error => {
            console.log(error);
          }
        );
      }
    }
  }
  // novo Evento

  novoEvento(template: any) {
    this.modolSalvar = 'post';
    this.openModal(template);
  }
}
