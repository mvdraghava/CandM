import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayvendorsComponent } from './displayvendors.component';

describe('DisplayvendorsComponent', () => {
  let component: DisplayvendorsComponent;
  let fixture: ComponentFixture<DisplayvendorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayvendorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayvendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
