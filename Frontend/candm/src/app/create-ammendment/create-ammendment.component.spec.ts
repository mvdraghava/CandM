import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAmmendmentComponent } from './create-ammendment.component';

describe('CreateAmmendmentComponent', () => {
  let component: CreateAmmendmentComponent;
  let fixture: ComponentFixture<CreateAmmendmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAmmendmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAmmendmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
