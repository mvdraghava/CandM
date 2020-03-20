import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorClarrificationsComponent } from './vendor-clarrifications.component';

describe('VendorClarrificationsComponent', () => {
  let component: VendorClarrificationsComponent;
  let fixture: ComponentFixture<VendorClarrificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorClarrificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorClarrificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
