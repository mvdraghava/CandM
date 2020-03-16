import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommondetailsComponent } from './commondetails.component';

describe('CommondetailsComponent', () => {
  let component: CommondetailsComponent;
  let fixture: ComponentFixture<CommondetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommondetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommondetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
