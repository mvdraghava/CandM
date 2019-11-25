import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditvendordialogComponent } from './editvendordialog.component';

describe('EditvendordialogComponent', () => {
  let component: EditvendordialogComponent;
  let fixture: ComponentFixture<EditvendordialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditvendordialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditvendordialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
