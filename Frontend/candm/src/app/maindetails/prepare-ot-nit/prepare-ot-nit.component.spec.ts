import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareOtNITComponent } from './prepare-ot-nit.component';

describe('PrepareOtNITComponent', () => {
  let component: PrepareOtNITComponent;
  let fixture: ComponentFixture<PrepareOtNITComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrepareOtNITComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepareOtNITComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
