import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscreteAnalysis } from './discrete-analysis';

describe('DiscreteAnalysis', () => {
  let component: DiscreteAnalysis;
  let fixture: ComponentFixture<DiscreteAnalysis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscreteAnalysis]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscreteAnalysis);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
