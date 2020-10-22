import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ClassManageComponent } from './class/class-manage/class-manage.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfessorManageComponent } from './professor/professor-manage/professor-manage.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClassViewComponent } from './class/class-view/class-view.component';

@NgModule({
  declarations: [
    AppComponent,
    ClassManageComponent,
    ProfessorManageComponent,
    ClassViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
