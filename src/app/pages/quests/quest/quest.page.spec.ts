import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestPage } from './quest.page';

describe('QuestPage', () => {
  let component: QuestPage;
  let fixture: ComponentFixture<QuestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
