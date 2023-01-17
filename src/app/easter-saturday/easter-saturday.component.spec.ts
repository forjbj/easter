import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EasterSaturdayComponent } from './easter-saturday.component';

describe('EasterSaturdayComponent', () => {
  let component: EasterSaturdayComponent;
  let fixture: ComponentFixture<EasterSaturdayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EasterSaturdayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EasterSaturdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
