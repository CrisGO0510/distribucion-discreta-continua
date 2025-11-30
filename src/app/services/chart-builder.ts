import { Injectable } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Injectable({
  providedIn: 'root',
})
export class ChartBuilderService {
  barChart(labels: string[], values: number[]): ChartConfiguration<'bar'> {
    return {
      type: 'bar',
      data: {
        labels,
        datasets: [{ data: values }],
      },
    };
  }

  histogram(values: number[]): ChartConfiguration<'bar'> {
    return {
      type: 'bar',
      data: {
        labels: values.map((_, i) => i.toString()),
        datasets: [{ data: values }],
      },
    };
  }
}
