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
        this.evento.imgUrl = '';
        console.log(this.evento);
        console.log(event);
      }
    );
  }
  validation() {
    this.registerForm = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', Validators.required],
      data: ['', Validators.required],
      imgUrl: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(800)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      lotes: this.fb.array([this.criaLote()]),
      redesSociais: this.fb.array([this.criaRedeSoacial()])
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
    this.lotes.push(this.criaLote());
  }
  adicionarRedesSociais() {
    this.redesSociais.push(this.criaRedeSoacial());
  }
  removerLotes(id: number) {
    this.lotes.removeAt(id);
  }

  removerRedesSociais(id: number) {
    this.redesSociais.removeAt(id);
  }
  criaRedeSoacial(): FormGroup {
    return this.fb.group({
      nome: ['', Validators.required],
      url: ['', Validators.required]
    });
  }
  criaLote(): FormGroup {
    return this.fb.group({
      nome: ['', Validators.required],
      quantidade: ['', Validators.required],
      preco: ['', Validators.required],
      dataInicio: [''],
      dataFim: ['']
    });
  }
  onFileChange(file: FileList) {
    const reader = new FileReader();
    reader.onload = (event: any) => this.imagemURL = event.target.result;
    reader.readAsDataURL(file[0]);
  }

}
