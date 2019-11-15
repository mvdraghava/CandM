import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaindetailsComponent } from './maindetails.component';

describe('MaindetailsComponent', () => {
  let component: MaindetailsComponent;
  let fixture: ComponentFixture<MaindetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaindetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaindetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
