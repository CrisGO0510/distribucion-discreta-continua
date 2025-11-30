import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZTransform } from './z-transform';

describe('ZTransform', () => {
  let component: ZTransform;
  let fixture: ComponentFixture<ZTransform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZTransform]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZTransform);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
