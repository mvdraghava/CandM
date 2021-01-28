import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglevendorComponent } from './singlevendor.component';

describe('SinglevendorComponent', () => {
  let component: SinglevendorComponent;
  let fixture: ComponentFixture<SinglevendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglevendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglevendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
