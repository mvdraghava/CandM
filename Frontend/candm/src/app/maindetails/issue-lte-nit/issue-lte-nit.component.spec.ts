import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueLteNitComponent } from './issue-lte-nit.component';

describe('IssueLteNitComponent', () => {
  let component: IssueLteNitComponent;
  let fixture: ComponentFixture<IssueLteNitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueLteNitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueLteNitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
