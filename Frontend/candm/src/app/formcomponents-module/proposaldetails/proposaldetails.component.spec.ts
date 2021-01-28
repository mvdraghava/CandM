import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposaldetailsComponent } from './proposaldetails.component';

describe('ProposaldetailsComponent', () => {
  let component: ProposaldetailsComponent;
  let fixture: ComponentFixture<ProposaldetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposaldetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposaldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
