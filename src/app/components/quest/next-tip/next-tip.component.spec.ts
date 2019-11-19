import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextTipComponent } from './next-tip.component';

describe('NextTipComponent', () => {
  let component: NextTipComponent;
  let fixture: ComponentFixture<NextTipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextTipComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextTipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
