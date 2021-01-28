import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombineCommitteMembersComponent } from './combine-committe-members.component';

describe('CombineCommitteMembersComponent', () => {
  let component: CombineCommitteMembersComponent;
  let fixture: ComponentFixture<CombineCommitteMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombineCommitteMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombineCommitteMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
