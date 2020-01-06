import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishQuestComponent } from './finish-quest.component';

describe('FinishQuestComponent', () => {
  let component: FinishQuestComponent;
  let fixture: ComponentFixture<FinishQuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishQuestComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishQuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
