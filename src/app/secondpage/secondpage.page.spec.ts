import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondpagePage } from './secondpage.page';

describe('SecondpagePage', () => {
  let component: SecondpagePage;
  let fixture: ComponentFixture<SecondpagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondpagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
