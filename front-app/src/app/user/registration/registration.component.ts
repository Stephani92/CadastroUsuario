import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/Auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  user: User;

  constructor(private fb: FormBuilder,
              private toast: ToastrService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.validations();
  }
  validations() {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required ],
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', Validators.required]
      }, {validator: this.compararSenha})
    });
  }
  compararSenha(fb: FormGroup) {
    const confSenha = fb.get('confirmPassword');
    if (confSenha.errors == null || 'mismatch' in confSenha.errors) {
      if (fb.get('password').value !== confSenha.value) {
        confSenha.setErrors({mismatch: true});
      } else {
        confSenha.setErrors(null);
      }
    }
  }

  cadastrarUsuario() {
    if (this.registerForm.valid) {
      this.user = Object.assign({password: this.registerForm.get('passwords.password').value},
      this.registerForm.value);
      this.authService.register(this.user).subscribe(
        (x) => {
          console.log(x);
          this.router.navigate(['/user/login']);
          this.toast.success('Cadastro realidado!');
        }, error => {
          const erro = error.error;
          erro.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toast.error('Cadastro Duplicado!');
                break;
              default :
                this.toast.error(`Erro no cadastro! Code: ${element.code}`);
            }
          });
        });
    }
  }
}
