import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { param } from 'jquery';
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

  getClassWeeklyTimeTable(class_id) {
    return this.http.get(`${this.baseUrl}lecture/class/weekly/list`, {
      params: {
        class_id: class_id
      }
    });
  }

  getProfessorWeeklyTimeTable(professor_id) {
    return this.http.get(`${this.baseUrl}lecture/professor/weekly/list`, {
      params: {
        professor_id: professor_id
      }
    });
  }

  addLecture(data) {
    return this.http.post(`${this.baseUrl}lecture/add`, data);
  }

}
