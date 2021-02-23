import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaDetailsComponent } from './loa-details.component';

describe('LoaDetailsComponent', () => {
  let component: LoaDetailsComponent;
  let fixture: ComponentFixture<LoaDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
