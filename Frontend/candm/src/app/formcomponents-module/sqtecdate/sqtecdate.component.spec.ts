import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SqtecdateComponent } from './sqtecdate.component';

describe('SqtecdateComponent', () => {
  let component: SqtecdateComponent;
  let fixture: ComponentFixture<SqtecdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SqtecdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SqtecdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
