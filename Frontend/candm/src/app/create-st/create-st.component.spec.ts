import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStComponent } from './create-st.component';

describe('CreateStComponent', () => {
  let component: CreateStComponent;
  let fixture: ComponentFixture<CreateStComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
