import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { LteformComponent } from './lteform.component';

describe('LteformComponent', () => {
  let component: LteformComponent;
  let fixture: ComponentFixture<LteformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LteformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LteformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
