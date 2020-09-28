import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEscolaridadComponent } from './add-escolaridad.component';

describe('AddEscolaridadComponent', () => {
  let component: AddEscolaridadComponent;
  let fixture: ComponentFixture<AddEscolaridadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEscolaridadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEscolaridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
