import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendormanagementComponent } from './vendormanagement.component';

describe('VendormanagementComponent', () => {
  let component: VendormanagementComponent;
  let fixture: ComponentFixture<VendormanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendormanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendormanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
