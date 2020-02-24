import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipatedvendorsComponent } from './participatedvendors.component';

describe('ParticipatedvendorsComponent', () => {
  let component: ParticipatedvendorsComponent;
  let fixture: ComponentFixture<ParticipatedvendorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipatedvendorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipatedvendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
