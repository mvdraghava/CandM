import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericAmountComponent } from './generic-amount.component';

describe('GenericAmountComponent', () => {
  let component: GenericAmountComponent;
  let fixture: ComponentFixture<GenericAmountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericAmountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
