import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateCorrigendumComponent } from './date-corrigendum.component';

describe('DateCorrigendumComponent', () => {
  let component: DateCorrigendumComponent;
  let fixture: ComponentFixture<DateCorrigendumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateCorrigendumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateCorrigendumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
