import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SqTecDateComponent } from './sq-tec-date.component';

describe('SqTecDateComponent', () => {
  let component: SqTecDateComponent;
  let fixture: ComponentFixture<SqTecDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SqTecDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SqTecDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
