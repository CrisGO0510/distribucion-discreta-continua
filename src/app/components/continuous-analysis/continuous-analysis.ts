import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { DatasetService } from '../../services/dataset';
import { StatisticsService } from '../../services/statistics';

@Component({
  selector: 'app-continuous-analysis',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './continuous-analysis.html',
  styleUrl: './continuous-analysis.scss',
})
export class ContinuousAnalysis {
  private datasetService = inject(DatasetService);
  private statsService = inject(StatisticsService);

  variableData = this.datasetService.selectedContinuousColumnData;
  selectedVarName = this.datasetService.selectedContinuousColumn;

  stats = computed(() => {
    const data = this.variableData();
    if (!data || data.length === 0)
      return { mean: 0, median: 0, mode: [], stdDev: 0 };

    const mean = this.statsService.calculateMean(data);
    return {
      mean,
      median: this.statsService.calculateMedian(data),
      mode: this.statsService.calculateMode(data),
      stdDev: this.statsService.calculateStdDev(data, mean),
    };
  });

  isNormalApprox = computed(() => {
    const s = this.stats();
    if (s.stdDev === 0) return false;
    return Math.abs(s.mean - s.median) < s.stdDev * 0.1;
  });

  chartData = computed<ChartConfiguration<'bar'>['data']>(() => {
    const data = this.variableData();
    const hist = this.statsService.createHistogramData(data || [], 15);

    return {
      labels: hist.labels,
      datasets: [
        {
          data: hist.data,
          label: 'Frecuencia',
          backgroundColor: 'rgba(59, 130, 246, 0.6)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1,
          barPercentage: 1.0,
          categoryPercentage: 1.0,
        },
      ],
    };
  });

  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Distribución de Datos' },
    },
  };
}
