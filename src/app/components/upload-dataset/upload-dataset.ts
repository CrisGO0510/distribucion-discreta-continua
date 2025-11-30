import { Component, inject } from '@angular/core';
import { DatasetOption, DatasetService } from '../../services/dataset';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-dataset',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-dataset.html',
  styleUrl: './upload-dataset.scss',
})
export class UploadDataset {
  public datasetService = inject(DatasetService);

  selectPreset(option: DatasetOption) {
    this.datasetService.loadPresetDataset(option.path, option.name);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.datasetService.loadLocalFile(file);
    }
  }
}
