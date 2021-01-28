import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeFieldComponent } from './employee-field.component';

describe('EmployeeFieldComponent', () => {
  let component: EmployeeFieldComponent;
  let fixture: ComponentFixture<EmployeeFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
