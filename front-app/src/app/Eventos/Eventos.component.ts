import { Component, OnInit } from '@angular/core';
import { EventoService } from '../_services/evento.service';
import { Evento } from '../_models/evento';
import { defineLocale, BsLocaleService, ptBrLocale } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-eventos',
  templateUrl: './Eventos.component.html',
  styleUrls: ['./Eventos.component.css']
})
export class EventosComponent implements OnInit {

  imagemMargem = 2;
  imagemAltura = 50;
  eventos: Evento[];
  evento: Evento;
  registerForm: FormGroup;
  test: Evento;

  modolSalvar = '';
  bodyDeletarEvento = '';

  // Filtro
        /** filtroLista1: string;
        eventosFiltrados: any = [];
        get filtroLista(): string {
          return this.filtroLista1;
        }
        set filtroLista(value: string) {
          this.filtroLista1 = value;
          if (this.filtroLista1 == null) {
            this.eventosFiltrados = this.eventos;
          } else {
            this.FiltrarEventos(this.filtroLista);
          }
        }
        FiltrarEventos(filtraPor: string): any {
          if (filtraPor == null) {
            return this.eventos.filter(
              evento => evento.tema.toLocaleLowerCase().indexOf(filtraPor) !== -1
            );
          } else {
            filtraPor = filtraPor.toLocaleLowerCase();
          }
          return this.eventos.filter(
            evento => evento.tema.toLocaleLowerCase().indexOf(filtraPor) !== -1
          );
        } */



  constructor(
    private eventoService: EventoService,
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private toastrService: ToastrService
    ) {
        this.localeService.use('pt-br');
     }

  ngOnInit() {
    this.getEventos();
    this.validation();
  }

  // eventos
  getEventos() {
      this.eventoService.getAllEvento().subscribe(( eventos: Evento[]) => {
        this.eventos = eventos;
        console.log(this.eventos);
    }, error => {
      this.toastrService.error(`Erro ao cadastrar ${error}`);
    });
  }

  // evento por tema
  getEventosByTema(tema: string) {
      this.eventoService.getEventoByTema(tema).subscribe(( eventos: Evento[]) => {
        this.eventos = eventos;
        console.log(this.eventos);
    }, error => {
      this.toastrService.error(`Erro ao cadastrar ${error}`);
    });
  }

  // evento por id
  getEventosById(id: number) {
      this.eventoService.getEventoById(id).subscribe(( eventos: Evento) => {
        this.evento = eventos;
    }, error => {
      this.toastrService.error(`Erro ao cadastrar ${error}`);
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
  // excluir evento
  excluirEvento(evento: Evento, template: any) {
    this.openModal(template);
    this.evento = evento;
    this.bodyDeletarEvento = `Tem certeza que deseja excluir o Evento: ${evento.tema}, Código: ${evento.id}`;
  }

  // conf delete evento
  confirmeDelete() {
    this.eventoService.deleteEvento(this.evento).subscribe(
      () => {
        this.toastrService.success('Evento excluido com sucesso' );
        this.getEventos();
      }, error => {
        this.toastrService.error(`Erro ao cadastrar ${error}`);
      }
    );
  }

  // salvar e alterar Evento
  salvarAlteracoes(template: any) {
    if (this.registerForm.valid) {
      if (this.modolSalvar === 'put') {
        this.evento = Object.assign({id: this.evento.id}, this.registerForm.value);
        this.eventoService.putEvento(this.evento).subscribe(
          () => {
            this.toastrService.success('Evento alterado com sucesso', 'Sucesso');
            this.getEventos();
          }, error => {
            this.toastrService.error(`Erro ao editar ${error}`);
          }
        );
      } else {
        this.evento = Object.assign({}, this.registerForm.value);
        this.eventoService.postEvento(this.evento).subscribe(
          () => {
            this.toastrService.success('Evento cadastrado com sucesso', 'Sucesso');
            template.hide();
            this.getEventos();
          }, error => {
            this.toastrService.error(`Erro ao cadastrar ${error}`);
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
