import { TestBed } from '@angular/core/testing';

import { Rent } from './rent';

describe('Rent', () => {
  let service: Rent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Rent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
