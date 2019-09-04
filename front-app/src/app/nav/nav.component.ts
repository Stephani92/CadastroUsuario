import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/Auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public router: Router,
              private authService: AuthService,
              private toastr: ToastrService) { }

  ngOnInit() {
  }
  loggeIn() {
    return this.authService.loggeIn();
  }
  logOut() {
    localStorage.removeItem('token');
    this.toastr.show('Log Out!');
    this.router.navigate(['/user/login']);
  }

  userName() {
    return sessionStorage.getItem('username');
  }
}
