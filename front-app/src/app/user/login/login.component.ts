import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/Auth.service';
import { UserLogin } from 'src/app/_models/UserLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new UserLogin();

  constructor(private toast: ToastrService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('token') !== null) {
      this.router.navigate(['/home']);
    }
  }

  login() {
    this.authService.login(this.user).subscribe(() => {
      this.router.navigate(['/home']);
    }, error => {
      console.log(error);
      this.toast.error(`Falha ao tentar logar!`);
    });
  }


}
