/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EventosComponent } from './Eventos.component';

describe('EventosComponent', () => {
  let component: EventosComponent;
  let fixture: ComponentFixture<EventosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
