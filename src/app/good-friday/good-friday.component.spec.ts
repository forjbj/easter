import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodFridayComponent } from './good-friday.component';

describe('GoodFridayComponent', () => {
  let component: GoodFridayComponent;
  let fixture: ComponentFixture<GoodFridayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodFridayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoodFridayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
