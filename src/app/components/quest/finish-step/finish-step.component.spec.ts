import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishStepComponent } from './finish-step.component';

describe('FinishStepComponent', () => {
  let component: FinishStepComponent;
  let fixture: ComponentFixture<FinishStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishStepComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
