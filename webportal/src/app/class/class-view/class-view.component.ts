import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassServiceService } from '../class-service.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfessorManageService } from 'src/app/professor/professor-manage.service';

@Component({
  selector: 'app-class-view',
  templateUrl: './class-view.component.html',
  styleUrls: ['./class-view.component.css']
})
export class ClassViewComponent implements OnInit {

  constructor(private classService: ClassServiceService,
    private professorService: ProfessorManageService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private formBuilder: FormBuilder) { }

  timeTable = [];
  modalTitle = "Add Lecture ";
  class_id = "";
  class: any = {};
  professorList = [];
  limitExceededErr = '';
  submitted = false;
  addLectureForm: FormGroup;
  modalReference: NgbModalRef;

  ngOnInit() {
    this.addLectureForm = this.formBuilder.group({
      slot: ['', [Validators.required]],
      day: ['', [Validators.required]],
      subject_name: ['', [Validators.required]],
      professor: ['', [Validators.required]],
      class: ['', []]
    });
    this.getTimeTable();
    this.getAllProfessors();
  }

  getAllProfessors() {
    this.professorService.getAllProfessors().subscribe((data: any) => {
      this.professorList = data.data.list.map((prof) => prof = {
        first_name: prof.first_name,
        last_name: prof.last_name,
        _id: prof._id
      });
      console.log("ClassViewComponent -> getAllProfessors -> this.professorList", this.professorList)
    });
  }

  getTimeTable() {
    this.class_id = this.activatedRoute.snapshot.paramMap.get('class_id');
    console.log("ClassViewComponent -> getTimeTable -> this.class_id", this.class_id)

    this.classService.getClassWeeklyTimeTable(this.class_id).subscribe((data: any) => {
      this.timeTable = data.data.list;
      this.class = data.data.class;
    });
  }

  displaySubject(day, slot) {
    let [sub] = this.timeTable.filter((tt) => tt.day == day && tt.slot == slot);
    if (sub) {
      return sub.subject_name;
    } else {
      return null;
    }
  }

  submitLecture() {
    this.submitted = true;
    if (this.addLectureForm.invalid) {
      return;
    }
    this.classService.addLecture(this.addLectureForm.value).subscribe((data: any) => {
      this.submitted = false;
      this.modalReference.close();
      this.getTimeTable();
      this.addLectureForm.reset();
    }, (err) => {
      if (err.status == 400) {
        this.limitExceededErr = err.error.message;
        setTimeout(() => {
          this.limitExceededErr = '';
        }, 5000);
      }
    });
  }

  get f() { return this.addLectureForm.controls; }

  openModal(content, day, slot) {
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.modalTitle = "Add Lecture ";
    }, (reason) => {
      this.modalTitle = "Add Lecture ";
    });
    this.modalTitle += `${slot} For Day ${day}`;
    this.addLectureForm.patchValue({
      slot: slot,
      day: day,
      class: this.class_id
    });
  }

}
