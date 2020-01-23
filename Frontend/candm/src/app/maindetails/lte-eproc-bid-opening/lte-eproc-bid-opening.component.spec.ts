import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LteEprocBidOpeningComponent } from './lte-eproc-bid-opening.component';

describe('LteEprocBidOpeningComponent', () => {
  let component: LteEprocBidOpeningComponent;
  let fixture: ComponentFixture<LteEprocBidOpeningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LteEprocBidOpeningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LteEprocBidOpeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
