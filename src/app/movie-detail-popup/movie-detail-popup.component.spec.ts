import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailPopupComponent } from './movie-detail-popup.component';

describe('MovieDetailPopupComponent', () => {
  let component: MovieDetailPopupComponent;
  let fixture: ComponentFixture<MovieDetailPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieDetailPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
