import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLTEComponent } from './create-lte.component';

describe('CreateLTEComponent', () => {
  let component: CreateLTEComponent;
  let fixture: ComponentFixture<CreateLTEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLTEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLTEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
