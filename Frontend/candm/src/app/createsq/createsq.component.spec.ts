import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatesqComponent } from './createsq.component';

describe('CreatesqComponent', () => {
  let component: CreatesqComponent;
  let fixture: ComponentFixture<CreatesqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatesqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatesqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
