import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OldcontractcreateComponent } from './oldcontractcreate.component';

describe('OldcontractcreateComponent', () => {
  let component: OldcontractcreateComponent;
  let fixture: ComponentFixture<OldcontractcreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldcontractcreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldcontractcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
