import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOtComponent } from './create-ot.component';

describe('CreateOtComponent', () => {
  let component: CreateOtComponent;
  let fixture: ComponentFixture<CreateOtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
