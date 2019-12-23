import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherCorrigendumComponent } from './other-corrigendum.component';

describe('OtherCorrigendumComponent', () => {
  let component: OtherCorrigendumComponent;
  let fixture: ComponentFixture<OtherCorrigendumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherCorrigendumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherCorrigendumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
