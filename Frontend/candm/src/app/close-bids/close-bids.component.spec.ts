import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseBidsComponent } from './close-bids.component';

describe('CloseBidsComponent', () => {
  let component: CloseBidsComponent;
  let fixture: ComponentFixture<CloseBidsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseBidsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseBidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
