import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLteComponent } from './create-lte.component';

describe('CreateLteComponent', () => {
  let component: CreateLteComponent;
  let fixture: ComponentFixture<CreateLteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
