import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Zadanie6childComponent } from './zadanie6child.component';

describe('Zadanie6childComponent', () => {
  let component: Zadanie6childComponent;
  let fixture: ComponentFixture<Zadanie6childComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Zadanie6childComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Zadanie6childComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
