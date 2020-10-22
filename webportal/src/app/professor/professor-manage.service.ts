import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfessorManageService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.baseUrl;

  getAllProfessors() {
    return this.http.get(`${this.baseUrl}professor/list`);
  }

  addProfessor(data) {
    return this.http.post(`${this.baseUrl}professor/add`, data);
  }
}
