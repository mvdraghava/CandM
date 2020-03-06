import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSqTecComponent } from './create-sq-tec.component';

describe('CreateSqTecComponent', () => {
  let component: CreateSqTecComponent;
  let fixture: ComponentFixture<CreateSqTecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSqTecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSqTecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
