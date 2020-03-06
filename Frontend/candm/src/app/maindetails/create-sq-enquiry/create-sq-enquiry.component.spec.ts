import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSqEnquiryComponent } from './create-sq-enquiry.component';

describe('CreateSqEnquiryComponent', () => {
  let component: CreateSqEnquiryComponent;
  let fixture: ComponentFixture<CreateSqEnquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSqEnquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSqEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
