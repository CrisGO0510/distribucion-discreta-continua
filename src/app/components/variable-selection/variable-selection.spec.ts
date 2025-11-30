import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableSelection } from './variable-selection';

describe('VariableSelection', () => {
  let component: VariableSelection;
  let fixture: ComponentFixture<VariableSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VariableSelection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VariableSelection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
