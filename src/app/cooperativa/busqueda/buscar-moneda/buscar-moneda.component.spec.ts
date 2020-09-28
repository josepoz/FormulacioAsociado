import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarMonedaComponent } from './buscar-moneda.component';

describe('BuscarMonedaComponent', () => {
  let component: BuscarMonedaComponent;
  let fixture: ComponentFixture<BuscarMonedaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarMonedaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarMonedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
