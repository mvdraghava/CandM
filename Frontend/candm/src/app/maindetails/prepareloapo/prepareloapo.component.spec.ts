import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareloapoComponent } from './prepareloapo.component';

describe('PrepareloapoComponent', () => {
  let component: PrepareloapoComponent;
  let fixture: ComponentFixture<PrepareloapoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrepareloapoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepareloapoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
