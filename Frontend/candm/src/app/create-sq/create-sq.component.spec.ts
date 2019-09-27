import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSqComponent } from './create-sq.component';

describe('CreateSqComponent', () => {
  let component: CreateSqComponent;
  let fixture: ComponentFixture<CreateSqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
