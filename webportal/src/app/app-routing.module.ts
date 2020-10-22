import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClassManageComponent } from './class/class-manage/class-manage.component';
import { ProfessorManageComponent } from './professor/professor-manage/professor-manage.component';
import { ClassViewComponent } from './class/class-view/class-view.component';

const routes: Routes = [
  { path: 'class-manage', component: ClassManageComponent },
  { path: 'class-view/:class_id', component: ClassViewComponent },
  { path: 'professor-manage', component: ProfessorManageComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
