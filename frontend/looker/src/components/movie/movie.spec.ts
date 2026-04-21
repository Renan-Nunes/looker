import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Movie } from './movie';

describe('Movie', () => {
  let component: Movie;
  let fixture: ComponentFixture<Movie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Movie],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        { provide: ActivatedRoute, useValue: { params: of({ id: '1' }) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Movie);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
