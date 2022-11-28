import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Zadanie5Component } from './zadanie5.component';

describe('Zadanie5Component', () => {
  let component: Zadanie5Component;
  let fixture: ComponentFixture<Zadanie5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Zadanie5Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Zadanie5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
