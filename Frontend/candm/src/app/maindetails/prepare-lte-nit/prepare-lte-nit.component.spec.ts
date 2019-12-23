import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareLteNitComponent } from './prepare-lte-nit.component';

describe('PrepareLteNitComponent', () => {
  let component: PrepareLteNitComponent;
  let fixture: ComponentFixture<PrepareLteNitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrepareLteNitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepareLteNitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
