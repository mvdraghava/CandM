import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EprocTecComponent } from './eproc-tec.component';

describe('EprocTecComponent', () => {
  let component: EprocTecComponent;
  let fixture: ComponentFixture<EprocTecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EprocTecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EprocTecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
