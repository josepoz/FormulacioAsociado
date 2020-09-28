import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarsocioComponent } from './buscarsocio.component';

describe('BuscarsocioComponent', () => {
  let component: BuscarsocioComponent;
  let fixture: ComponentFixture<BuscarsocioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarsocioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarsocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
