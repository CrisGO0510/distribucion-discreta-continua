import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatasetService } from '../../services/dataset';

@Component({
  selector: 'app-upload-dataset',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-dataset.html',
  styleUrls: ['./upload-dataset.scss'],
})
export class UploadDataset {
  file = signal<File | null>(null);
  name = signal('');
  source = signal('');
  description = signal('');

  constructor(private datasetService: DatasetService) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file.set(input.files[0]);
    }
  }

  async upload() {
    if (!this.file()) {
      alert('Debe seleccionar un archivo.');
      return;
    }

    await this.datasetService.loadCSV(
      this.file()!,
      this.name(),
      this.source(),
      this.description(),
    );

    alert('Dataset cargado correctamente');
  }
}
