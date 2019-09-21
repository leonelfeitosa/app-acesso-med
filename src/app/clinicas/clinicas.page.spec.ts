import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicasPage } from './clinicas.page';

describe('ClinicasPage', () => {
  let component: ClinicasPage;
  let fixture: ComponentFixture<ClinicasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
