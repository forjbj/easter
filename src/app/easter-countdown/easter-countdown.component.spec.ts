import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EasterCountdownComponent } from './easter-countdown.component';

describe('EasterCountdownComponent', () => {
  let component: EasterCountdownComponent;
  let fixture: ComponentFixture<EasterCountdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EasterCountdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EasterCountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
