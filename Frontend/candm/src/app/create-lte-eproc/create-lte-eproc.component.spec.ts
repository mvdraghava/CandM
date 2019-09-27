import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLteEprocComponent } from './create-lte-eproc.component';

describe('CreateLteEprocComponent', () => {
  let component: CreateLteEprocComponent;
  let fixture: ComponentFixture<CreateLteEprocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLteEprocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLteEprocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
