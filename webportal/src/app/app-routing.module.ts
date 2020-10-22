import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClassManageComponent } from './class/class-manage/class-manage.component';
import { ProfessorManageComponent } from './professor/professor-manage/professor-manage.component';
import { ClassViewComponent } from './class/class-view/class-view.component';
import { ProfessorTimetableComponent } from './professor/professor-timetable/professor-timetable.component';

const routes: Routes = [
  { path: '', component: ClassManageComponent },
  { path: 'class-manage', component: ClassManageComponent },
  { path: 'class-view/:class_id', component: ClassViewComponent },
  { path: 'professor-manage', component: ProfessorManageComponent },
  { path: 'professor-time-table/:professor_id', component: ProfessorTimetableComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
