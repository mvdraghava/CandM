import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrformComponent } from './qrform.component';

describe('QrformComponent', () => {
  let component: QrformComponent;
  let fixture: ComponentFixture<QrformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
