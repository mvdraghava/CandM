import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LteTecReportComponent } from './lte-tec-report.component';

describe('LteTecReportComponent', () => {
  let component: LteTecReportComponent;
  let fixture: ComponentFixture<LteTecReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LteTecReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LteTecReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
