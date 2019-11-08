import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterBidsComponent } from './filter-bids.component';

describe('FilterBidsComponent', () => {
  let component: FilterBidsComponent;
  let fixture: ComponentFixture<FilterBidsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterBidsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterBidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
