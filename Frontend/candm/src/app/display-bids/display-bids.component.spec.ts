import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayBidsComponent } from './display-bids.component';

describe('DisplayBidsComponent', () => {
  let component: DisplayBidsComponent;
  let fixture: ComponentFixture<DisplayBidsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayBidsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayBidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
