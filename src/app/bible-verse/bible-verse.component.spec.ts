import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibleVerseComponent } from './bible-verse.component';

describe('BibleVerseComponent', () => {
  let component: BibleVerseComponent;
  let fixture: ComponentFixture<BibleVerseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BibleVerseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BibleVerseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
