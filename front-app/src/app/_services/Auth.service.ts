import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { UserLogin } from '../_models/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baserUrl = 'http://localhost:5000/api/user/';
  decodedToken: any;
  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(`${this.baserUrl}login`, model).pipe(map((resp: any) => {
      const user = resp;
      if (user) {
        localStorage.setItem('token', user.token);
        this.decodedToken = this.jwtHelper.decodeToken(user.token);
      }
    }));
  }
  register(model: User) {
    return this.http.post(`${this.baserUrl}register`, model);
  }

  loggeIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
