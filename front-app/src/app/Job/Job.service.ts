import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../_models/Job';
import { IntDto } from '../_models/Dtos/IntDto';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  baseURL = 'http://localhost:5000/api/User';
  constructor(private http: HttpClient) { }

  getJobsByUser(x: number): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.baseURL}/getjobUser/${x}`);
  }

}
