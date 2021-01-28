import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericloapoComponent } from './genericloapo.component';

describe('GenericloapoComponent', () => {
  let component: GenericloapoComponent;
  let fixture: ComponentFixture<GenericloapoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericloapoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericloapoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
