import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareOtBOQComponent } from './prepare-ot-boq.component';

describe('PrepareOtBOQComponent', () => {
  let component: PrepareOtBOQComponent;
  let fixture: ComponentFixture<PrepareOtBOQComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrepareOtBOQComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepareOtBOQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
