import { Component, inject, signal, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { StatisticsService } from '../../services/statistics';
import { DatasetService } from '../../services/dataset';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-transformations',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './transformations.html',
  styleUrl: './transformations.scss',
})
export class Transformations {
  private statsService = inject(StatisticsService);
  private datasetService = inject(DatasetService);

  originalData = this.datasetService.selectedContinuousColumnData;

  transformedData = signal<number[]>([]);
  currentTransform = signal<string>('Ninguna');

  constructor() {
    effect(
      () => {
        this.transformedData.set(this.originalData());
      },
      { allowSignalWrites: true },
    );
  }

  applyLog() {
    const data = this.originalData();

    const transformed = data.map((x: number) => (x > 0 ? Math.log(x) : 0));
    this.transformedData.set(transformed);
    this.currentTransform.set('Logaritmo Natural');
  }

  applySqrt() {
    const data = this.originalData();
    const transformed = data.map((x: number) => Math.sqrt(Math.max(0, x)));
    this.transformedData.set(transformed);
    this.currentTransform.set('Raíz Cuadrada');
  }

  reset() {
    this.transformedData.set(this.originalData());
    this.currentTransform.set('Ninguna');
  }

  originalChartData = computed<ChartConfiguration<'bar'>['data']>(() => {
    const hist = this.statsService.createHistogramData(this.originalData());
    return {
      labels: hist.labels,
      datasets: [{ data: hist.data, label: 'Original' }],
    };
  });

  transformedChartData = computed<ChartConfiguration<'bar'>['data']>(() => {
    const hist = this.statsService.createHistogramData(this.transformedData());
    return {
      labels: hist.labels,
      datasets: [
        { data: hist.data, label: 'Transf.', backgroundColor: '#10b981' },
      ],
    };
  });

  options = { responsive: true, maintainAspectRatio: false };
}
