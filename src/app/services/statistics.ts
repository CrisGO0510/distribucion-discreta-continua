import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  calculateMean(data: number[]): number {
    const sum = data.reduce((a, b) => a + b, 0);
    return sum / data.length;
  }

  calculateMedian(data: number[]): number {
    const sorted = [...data].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0
      ? sorted[mid]
      : (sorted[mid - 1] + sorted[mid]) / 2;
  }

  calculateMode(data: number[]): number[] {
    const frequency: Record<string, number> = {};
    let maxFreq = 0;
    let modes: number[] = [];

    data.forEach((num) => {
      frequency[num] = (frequency[num] || 0) + 1;
      if (frequency[num] > maxFreq) maxFreq = frequency[num];
    });

    for (const key in frequency) {
      if (frequency[key] === maxFreq) modes.push(Number(key));
    }
    return modes;
  }

  calculateStdDev(data: number[], mean: number): number {
    const squareDiffs = data.map((value) => Math.pow(value - mean, 2));
    const avgSquareDiff = this.calculateMean(squareDiffs);
    return Math.sqrt(avgSquareDiff);
  }

  getFrequencies(data: any[]): { label: string; count: number }[] {
    const counts: Record<string, number> = {};

    data.forEach((x) => {
      counts[x] = (counts[x] || 0) + 1;
    });

    return Object.keys(counts)
      .map((key) => ({
        label: key,
        count: counts[key],
      }))

      .sort((a, b) => {
        const numA = parseFloat(a.label);
        const numB = parseFloat(b.label);

        if (!isNaN(numA) && !isNaN(numB)) {
          return numA - numB;
        }

        return a.label.localeCompare(b.label);
      });
  }
  calculateZScore(x: number, mean: number, stdDev: number): number {
    return (x - mean) / stdDev;
  }

  createHistogramData(data: number[], binCount: number = 10) {
    if (!data || data.length === 0) return { labels: [], data: [] };

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;
    const binSize = range / binCount;

    const bins = new Array(binCount).fill(0);
    const labels: string[] = [];

    for (let i = 0; i < binCount; i++) {
      const start = min + i * binSize;
      const end = start + binSize;

      labels.push(`${this.formatNumber(start)} - ${this.formatNumber(end)}`);
    }

    data.forEach((num) => {
      let bucket = Math.floor((num - min) / binSize);
      if (bucket >= binCount) bucket = binCount - 1;
      bins[bucket]++;
    });

    return { labels, data: bins };
  }

  private formatNumber(num: number): string {
    if (num === 0) return '0';

    if (Math.abs(num) >= 1.0e9) {
      return (num / 1.0e9).toFixed(1) + 'B';
    }

    if (Math.abs(num) >= 1.0e6) {
      return (num / 1.0e6).toFixed(1) + 'M';
    }

    if (Math.abs(num) >= 1.0e3) {
      return (num / 1.0e3).toFixed(0) + 'K';
    }

    return num.toFixed(0);
  }
}
