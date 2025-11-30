import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDataset } from './upload-dataset';

describe('UploadDataset', () => {
  let component: UploadDataset;
  let fixture: ComponentFixture<UploadDataset>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadDataset]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadDataset);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
