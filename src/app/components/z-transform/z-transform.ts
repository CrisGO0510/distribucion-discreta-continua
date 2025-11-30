import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { DatasetService } from '../../services/dataset';
import { StatisticsService } from '../../services/statistics';

@Component({
  selector: 'app-z-transform',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DecimalPipe,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './z-transform.html',
  styleUrl: './z-transform.scss',
})
export class ZTransform {
  private datasetService = inject(DatasetService);
  private statsService = inject(StatisticsService);

  data = this.datasetService.selectedContinuousColumnData;
  variableName = this.datasetService.selectedContinuousColumn;

  baseStats = computed(() => {
    const values = this.data();
    if (!values || values.length === 0) return { mean: 0, stdDev: 1 };

    const mean = this.statsService.calculateMean(values);
    const stdDev = this.statsService.calculateStdDev(values, mean);

    return { mean, stdDev };
  });

  value1 = signal<number | null>(null);
  value2 = signal<number | null>(null);

  result1 = computed(() => this.calculateZ(this.value1()));
  result2 = computed(() => this.calculateZ(this.value2()));

  private calculateZ(x: number | null) {
    if (x === null) return null;
    const { mean, stdDev } = this.baseStats();
    if (stdDev === 0) return 0;

    return (x - mean) / stdDev;
  }

  getInterpretation(z: number): string {
    const absZ = Math.abs(z);
    let distText = '';

    if (absZ < 1) distText = 'Muy cerca del promedio (Zona central).';
    else if (absZ < 2) distText = 'Algo alejado, pero común.';
    else if (absZ < 3) distText = 'Lejos del promedio (Valor atípico posible).';
    else distText = 'Muy lejos (Outlier extremo).';

    const direction = z >= 0 ? 'por encima' : 'por debajo';

    return `El valor está ${z.toFixed(2)} desviaciones estándar ${direction} de la media. ${distText}`;
  }
}
