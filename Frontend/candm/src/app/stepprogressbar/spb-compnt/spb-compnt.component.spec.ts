import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpbCompntComponent } from './spb-compnt.component';

describe('SpbCompntComponent', () => {
  let component: SpbCompntComponent;
  let fixture: ComponentFixture<SpbCompntComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpbCompntComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpbCompntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
