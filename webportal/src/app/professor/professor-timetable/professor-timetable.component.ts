import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassServiceService } from 'src/app/class/class-service.service';

@Component({
  selector: 'app-professor-timetable',
  templateUrl: './professor-timetable.component.html',
  styleUrls: ['./professor-timetable.component.css']
})
export class ProfessorTimetableComponent implements OnInit {

  constructor(private classService: ClassServiceService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getTimeTable();
  }

  professor: any = {};
  timeTable = [];
  professor_id = "";

  getTimeTable() {
    this.professor_id = this.activatedRoute.snapshot.paramMap.get('professor_id');
    console.log("ClassViewComponent -> getTimeTable -> this.professor_id", this.professor_id)

    this.classService.getProfessorWeeklyTimeTable(this.professor_id).subscribe((data: any) => {
      this.timeTable = data.data.list;
      this.professor = data.data.professor;
    });
  }

  displaySubject(day, slot) {
    let [sub] = this.timeTable.filter((tt) => tt.day == day && tt.slot == slot);
    if (sub) {
      return `${sub.subject_name} (${sub.class.name})`;
    } else {
      return '--';
    }
  }

}
