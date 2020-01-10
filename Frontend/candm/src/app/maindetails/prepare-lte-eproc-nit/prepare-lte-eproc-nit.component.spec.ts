import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareLteEprocNitComponent } from './prepare-lte-eproc-nit.component';

describe('PrepareLteEprocNitComponent', () => {
  let component: PrepareLteEprocNitComponent;
  let fixture: ComponentFixture<PrepareLteEprocNitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrepareLteEprocNitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepareLteEprocNitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
