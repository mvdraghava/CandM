import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenBidsComponent } from './open-bids.component';

describe('OpenBidsComponent', () => {
  let component: OpenBidsComponent;
  let fixture: ComponentFixture<OpenBidsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenBidsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenBidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
