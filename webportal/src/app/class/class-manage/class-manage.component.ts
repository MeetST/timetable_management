import { Component, OnInit } from '@angular/core';
import { ClassServiceService } from '../class-service.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-class-manage',
  templateUrl: './class-manage.component.html',
  styleUrls: ['./class-manage.component.css']
})
export class ClassManageComponent implements OnInit {

  classList = [];
  isEmptyClassName = false;
  className = "";
  modalReference: NgbModalRef;

  constructor(private classService: ClassServiceService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.getAllClasses();
  }

  getAllClasses() {
    this.classService.getAllClasses().subscribe((data: any) => {
      console.log("ClassManageComponent -> getAllClasses -> data", data)
      this.classList = data.data.list;
    });
  }

  openModal(content) {
    this.modalReference = this.modalService.open(content);
  }

  submitClass() {
    if (this.className) {
      this.classService.addClass({ class_name: this.className }).subscribe((data: any) => {
        this.getAllClasses();
        this.className = "";
        this.modalReference.close();
      });
    } else {
      this.isEmptyClassName = true;
    }
  }

  checkIsEmpty() {
    if (!this.className) {
      this.isEmptyClassName = true;
    } else {
      this.isEmptyClassName = false;
    }
  }

}
