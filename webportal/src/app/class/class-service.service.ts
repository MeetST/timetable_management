import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class ClassServiceService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.baseUrl;

  getAllClasses() {
    return this.http.get(`${this.baseUrl}class/list`);
  }

  addClass(data) {
    return this.http.post(`${this.baseUrl}class/add`, data);
  }

}
