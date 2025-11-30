import { TestBed } from '@angular/core/testing';

import { ChartBuilder } from './chart-builder';

describe('ChartBuilder', () => {
  let service: ChartBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartBuilder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
