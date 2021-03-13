import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowloaComponent } from './showloa.component';

describe('ShowloaComponent', () => {
  let component: ShowloaComponent;
  let fixture: ComponentFixture<ShowloaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowloaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowloaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
