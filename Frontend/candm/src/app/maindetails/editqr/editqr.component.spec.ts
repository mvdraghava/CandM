import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditqrComponent } from './editqr.component';

describe('EditqrComponent', () => {
  let component: EditqrComponent;
  let fixture: ComponentFixture<EditqrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditqrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
