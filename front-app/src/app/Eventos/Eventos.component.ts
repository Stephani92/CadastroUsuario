import { Component, OnInit } from '@angular/core';
import { EventoService } from '../_services/evento.service';
import { Evento } from '../_models/evento';
import { defineLocale, BsLocaleService, ptBrLocale } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
  mostrarImagem = true;
  file: File;
  filiNameToUpdate: string;
  dataAtual: string;

  modolSalvar = '';
  bodyDeletarEvento = '';

  constructor(public router: Router,
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
  mostrarImag() {
    this.mostrarImagem = !this.mostrarImagem;
  }
  onFileChange(evento) {
    const reader = new FileReader();
    if (evento.target.files && evento.target.files.length) {
      this.file = evento.target.files;
    }
  }

  // eventos
  getEventos() {
    this.dataAtual = new Date().getMilliseconds().toString();
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
    this.evento = Object.assign({}, evento);
    this.filiNameToUpdate = evento.imgUrl.toString();
    this.evento.imgUrl = '';
    this.registerForm.patchValue(this.evento);
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
  UploadImg() {
    if (this.modolSalvar === 'put') {
      this.evento.imgUrl = this.filiNameToUpdate;
      this.eventoService.postUpload(this.file, this.evento.imgUrl).subscribe(
        () => {
        this.dataAtual = new Date().getMilliseconds().toString();
        this.getEventos();
        }
      );
    } else {
      const nomeArquivo = this.evento.imgUrl.split('\\', 3);
      this.evento.imgUrl = nomeArquivo[2];
      this.eventoService.postUpload(this.file, nomeArquivo[2]).subscribe(
        () => {
        this.dataAtual = new Date() .getMilliseconds().toString();
        this.getEventos();
        }
      );
    }
  }
  // salvar e alterar Evento
  salvarAlteracoes(template: any) {
    if (this.registerForm.valid) {
      if (this.modolSalvar === 'put') {
        this.evento = Object.assign({id: this.evento.id}, this.registerForm.value);
        this.UploadImg();
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
        this.UploadImg();
        this.eventoService.postEvento(this.evento).subscribe(
          () => {
            this.toastrService.success('Evento cadastrado com sucesso', 'Sucesso');
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
