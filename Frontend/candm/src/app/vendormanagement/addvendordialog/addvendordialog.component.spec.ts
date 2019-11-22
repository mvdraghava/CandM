import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddvendordialogComponent } from './addvendordialog.component';

describe('AddvendordialogComponent', () => {
  let component: AddvendordialogComponent;
  let fixture: ComponentFixture<AddvendordialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddvendordialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddvendordialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
