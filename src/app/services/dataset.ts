import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Papa from 'papaparse';

export interface DatasetOption {
  name: string;
  path: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class DatasetService {
  private http = inject(HttpClient);

  readonly availableDatasets: DatasetOption[] = [
    {
      name: 'Rendimiento Estudiantil',
      path: 'datasets/estudiantes.csv',
      description: 'Datos de notas y estudio.',
    },
    {
      name: 'Ventas Trimestrales',
      path: 'datasets/ventas.csv',
      description: 'Registro de ventas y satisfacción.',
    },
  ];

  data = signal<any[]>([]);
  headers = signal<string[]>([]);
  fileName = signal<string>('');

  selectedContinuousColumn = signal<string>('');
  selectedDiscreteColumn = signal<string>('');

  loadPresetDataset(path: string, name: string) {
    this.http.get(path, { responseType: 'text' }).subscribe({
      next: (csvText) => {
        this.parseCsv(csvText);
        this.fileName.set(name);
      },
      error: (err) => console.error('Error cargando el dataset:', err),
    });
  }

  loadLocalFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.parseCsv(e.target.result);
      this.fileName.set(file.name);
    };
    reader.readAsText(file);
  }

  private parseCsv(csvText: string) {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (result) => {
        this.data.set(result.data);
        if (result.meta.fields) {
          this.headers.set(result.meta.fields);
        }

        this.selectedContinuousColumn.set('');
        this.selectedDiscreteColumn.set('');
      },
    });
  }

  selectedContinuousColumnData = computed<number[]>(() => {
    const colName = this.selectedContinuousColumn();
    const allData = this.data();

    if (!colName || allData.length === 0) return [];

    return allData
      .map((row) => row[colName])
      .filter((val) => typeof val === 'number' && !isNaN(val));
  });

  selectedDiscreteColumnData = computed<any[]>(() => {
    const colName = this.selectedDiscreteColumn();
    const allData = this.data();

    if (!colName || allData.length === 0) return [];

    return allData.map((row) => row[colName]);
  });
}
