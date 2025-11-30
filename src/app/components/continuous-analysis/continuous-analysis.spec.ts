import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinuousAnalysis } from './continuous-analysis';

describe('ContinuousAnalysis', () => {
  let component: ContinuousAnalysis;
  let fixture: ComponentFixture<ContinuousAnalysis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContinuousAnalysis]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContinuousAnalysis);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
