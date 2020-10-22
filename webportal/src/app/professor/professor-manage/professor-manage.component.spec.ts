import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorManageComponent } from './professor-manage.component';

describe('ProfessorManageComponent', () => {
  let component: ProfessorManageComponent;
  let fixture: ComponentFixture<ProfessorManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
