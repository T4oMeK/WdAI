import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Zadanie6parentComponent } from './zadanie6parent.component';

describe('Zadanie6parentComponent', () => {
  let component: Zadanie6parentComponent;
  let fixture: ComponentFixture<Zadanie6parentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Zadanie6parentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Zadanie6parentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
