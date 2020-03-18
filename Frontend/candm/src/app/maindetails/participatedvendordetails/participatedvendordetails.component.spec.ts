import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipatedvendordetailsComponent } from './participatedvendordetails.component';

describe('ParticipatedvendordetailsComponent', () => {
  let component: ParticipatedvendordetailsComponent;
  let fixture: ComponentFixture<ParticipatedvendordetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipatedvendordetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipatedvendordetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
