import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProfesionComponent } from './add-profesion.component';

describe('AddProfesionComponent', () => {
  let component: AddProfesionComponent;
  let fixture: ComponentFixture<AddProfesionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProfesionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProfesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
