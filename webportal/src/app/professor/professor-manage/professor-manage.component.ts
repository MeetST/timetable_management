import { Component, OnInit } from '@angular/core';
import { ProfessorManageService } from '../professor-manage.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-professor-manage',
  templateUrl: './professor-manage.component.html',
  styleUrls: ['./professor-manage.component.css']
})
export class ProfessorManageComponent implements OnInit {

  professorList = [];
  submitted = false;
  modalReference: NgbModalRef;
  adduserForm: FormGroup;
  duplicateEmail = false;

  constructor(private professorService: ProfessorManageService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.adduserForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]]
    });
    this.getAllProfessors();
  }

  getAllProfessors() {
    this.professorService.getAllProfessors().subscribe((data: any) => {
      this.professorList = data.data.list;
    });
  }

  get f() { return this.adduserForm.controls; }

  submitProfessor() {
    this.submitted = true;
    if (this.adduserForm.invalid) {
      return;
    }
    this.professorService.addProfessor(this.adduserForm.value).subscribe((data: any) => {
      this.submitted = false;
      this.modalReference.close();
      this.getAllProfessors();
      this.adduserForm.reset();
    }, (err) => {
      if (err.status == 400) {
        this.duplicateEmail = true;
        setTimeout(() => {
          this.duplicateEmail = false;
        }, 5000);
      }
    });
  }

  openModal(content) {
    this.modalReference = this.modalService.open(content);
  }


}
