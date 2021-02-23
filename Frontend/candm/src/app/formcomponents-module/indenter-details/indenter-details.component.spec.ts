import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndenterDetailsComponent } from './indenter-details.component';

describe('IndenterDetailsComponent', () => {
  let component: IndenterDetailsComponent;
  let fixture: ComponentFixture<IndenterDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndenterDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndenterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
