import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EasterSundayComponent } from './easter-sunday.component';

describe('EasterSundayComponent', () => {
  let component: EasterSundayComponent;
  let fixture: ComponentFixture<EasterSundayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EasterSundayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EasterSundayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
