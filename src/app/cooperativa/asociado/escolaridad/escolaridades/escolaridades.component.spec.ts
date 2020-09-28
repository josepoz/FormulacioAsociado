import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscolaridadesComponent } from './escolaridades.component';

describe('EscolaridadesComponent', () => {
  let component: EscolaridadesComponent;
  let fixture: ComponentFixture<EscolaridadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscolaridadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscolaridadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
