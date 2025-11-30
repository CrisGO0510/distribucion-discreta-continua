import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { DatasetService } from '../../services/dataset';
import { StatisticsService } from '../../services/statistics';

@Component({
  selector: 'app-discrete-analysis',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './discrete-analysis.html',
  styleUrl: './discrete-analysis.scss',
})
export class DiscreteAnalysis {
  private datasetService = inject(DatasetService);
  private statsService = inject(StatisticsService);

  variableData = this.datasetService.selectedDiscreteColumnData;
  variableName = this.datasetService.selectedDiscreteColumn;

  frequencyTable = computed(() => {
    const data = this.variableData();
    if (!data || data.length === 0) return [];

    return this.statsService.getFrequencies(data);
  });

  chartData = computed<ChartConfiguration<'bar'>['data']>(() => {
    const table = this.frequencyTable();

    return {
      labels: table.map((row) => row.label),
      datasets: [
        {
          data: table.map((row) => row.count),
          label: 'Cantidad',
          backgroundColor: [
            '#3b82f6',
            '#ef4444',
            '#10b981',
            '#f59e0b',
            '#8b5cf6',
          ],
        },
      ],
    };
  });

  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Diagrama de Barras' },
    },
  };
}
