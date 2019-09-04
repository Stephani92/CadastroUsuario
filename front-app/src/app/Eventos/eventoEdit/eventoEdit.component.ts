import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventoService } from 'src/app/_services/evento.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/_models/evento';

@Component({
  selector: 'app-evento-edit',
  templateUrl: './eventoEdit.component.html',
  styleUrls: ['./eventoEdit.component.css']
})
export class EventoEditComponent implements OnInit {


  registerForm: FormGroup;
  evento: Evento = new Evento();
  imagemURL = 'assets/img/images.png';
  fileNameToUpdate: string;
  dataAtual: string;
  file: File;

  constructor(public router: ActivatedRoute,
              private eventoService: EventoService,
              private fb: FormBuilder,
              private localeService: BsLocaleService,
              private toastrService: ToastrService
          ) {
          this.localeService.use('pt-br');
          }

  ngOnInit() {
    this.validation();
    this.carregarEvento();
  }

  carregarEvento() {
    const idEvento = +this.router.snapshot.paramMap.get('id');
    this.eventoService.getEventoById(idEvento).subscribe(
      (event: Evento) => {
        this.evento = Object.assign({}, event);
        this.fileNameToUpdate = event.imgUrl.toString();

        this.imagemURL = `http://localhost:5000/resources/images/${this.evento.imgUrl}?_ts=${this.dataAtual}`;
        this.evento.imgUrl = '';

        this.registerForm.patchValue(this.evento);

        this.evento.lotes.forEach(lote => {
          this.lotes.push(this.criaLote(lote));
        });
        this.evento.redesSociais.forEach(rs => {
          this.lotes.push(this.criaLote(rs));
        });
      }
    );
  }
  validation() {
    this.registerForm = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', Validators.required],
      data: ['', Validators.required],
      imgUrl: [''],
      qtdPessoas: ['', [Validators.required, Validators.max(800)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      lotes: this.fb.array([]),
      redesSociais: this.fb.array([])
    });
  }
  // lotes
  get lotes(): FormArray {
    return this.registerForm.get('lotes') as FormArray;
  }
  // Rede Sociais controls
  get redesSociais(): FormArray {
    return this.registerForm.get('redesSociais') as FormArray;
  }
  adicionarLotes() {
    this.lotes.push(this.criaLote({id: 0}));
  }
  adicionarRedesSociais() {
    this.redesSociais.push(this.criaRedeSoacial({id: 0}));
  }
  removerLotes(id: number) {
    this.lotes.removeAt(id);
  }

  removerRedesSociais(id: number) {
    this.redesSociais.removeAt(id);
  }
  criaRedeSoacial(rs: any): FormGroup {
    return this.fb.group({
      id: [rs.id],
      nome: [rs.nome, Validators.required],
      url: [rs.url, Validators.required]
    });
  }
  criaLote(lote: any): FormGroup {
    return this.fb.group({
      id: [lote.id],
      nome: [lote.nome, Validators.required],
      quantidade: [lote.quantidade, Validators.required],
      preco: [lote.preco, Validators.required],
      dataInicio: [lote.dataInicio],
      dataFim: [lote.dataFim]
    });
  }
  onFileChange(evento: any, file: FileList) {
    const reader = new FileReader();
    reader.onload = (event: any) => this.imagemURL = event.target.result;
    this.file = evento.target.files;
    reader.readAsDataURL(file[0]);
  }

  UploadImg() {
    console.log(this.evento.imgUrl);
    this.eventoService.postUpload(this.file, this.fileNameToUpdate).subscribe(
      () => {
      this.dataAtual = new Date().getMilliseconds().toString();
      this.imagemURL = `http://localhost:5000/resources/images/${this.evento.imgUrl}?_ts=${this.dataAtual}`;
      });
  }

  salvarEvento() {
      this.evento = Object.assign({id: this.evento.id}, this.registerForm.value);
      this.evento.imgUrl = this.fileNameToUpdate;
      if (this.registerForm.get('imgUrl').value !== '') {
        this.UploadImg();
      }
      this.eventoService.putEvento(this.evento).subscribe(
        () => {
          this.toastrService.success('Evento alterado com sucesso', 'Sucesso');
        }, error => {
          this.toastrService.error(`Erro ao editar ${error}`);
        }
      );
  }


}
