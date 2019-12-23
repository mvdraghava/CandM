import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLteCommitteeComponent } from './edit-lte-committee.component';

describe('EditLteCommitteeComponent', () => {
  let component: EditLteCommitteeComponent;
  let fixture: ComponentFixture<EditLteCommitteeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLteCommitteeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLteCommitteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
