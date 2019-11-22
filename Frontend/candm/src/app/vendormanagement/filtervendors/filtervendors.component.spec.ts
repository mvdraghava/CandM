import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltervendorsComponent } from './filtervendors.component';

describe('FiltervendorsComponent', () => {
  let component: FiltervendorsComponent;
  let fixture: ComponentFixture<FiltervendorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltervendorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltervendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
