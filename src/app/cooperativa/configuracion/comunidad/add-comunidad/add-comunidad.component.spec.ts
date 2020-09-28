import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComunidadComponent } from './add-comunidad.component';

describe('AddComunidadComponent', () => {
  let component: AddComunidadComponent;
  let fixture: ComponentFixture<AddComunidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddComunidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComunidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
