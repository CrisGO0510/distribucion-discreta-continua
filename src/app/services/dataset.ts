import { Injectable } from '@angular/core';
import Papa from 'papaparse';
import { Dataset } from '../models/dataset.model';

@Injectable({
  providedIn: 'root',
})
export class DatasetService {
  private dataset!: Dataset;

  loadCSV(
    file: File,
    name: string,
    source: string,
    description: string,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (result) => {
          this.dataset = {
            name,
            source,
            description,
            data: result.data,
            columns: result.meta.fields || [],
          };
          resolve();
        },
        error: (err) => reject(err),
      });
    });
  }

  getDataset(): Dataset {
    return this.dataset;
  }
}
