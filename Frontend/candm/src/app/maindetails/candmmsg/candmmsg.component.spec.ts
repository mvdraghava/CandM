import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandmmsgComponent } from './candmmsg.component';

describe('CandmmsgComponent', () => {
  let component: CandmmsgComponent;
  let fixture: ComponentFixture<CandmmsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandmmsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandmmsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
