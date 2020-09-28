import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMunicipioComponent } from './add-municipio.component';

describe('AddMunicipioComponent', () => {
  let component: AddMunicipioComponent;
  let fixture: ComponentFixture<AddMunicipioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMunicipioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMunicipioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
