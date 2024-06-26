import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPopupComponent } from './book-popup.component';

describe('BookPopupComponent', () => {
  let component: BookPopupComponent;
  let fixture: ComponentFixture<BookPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
