import { Injectable } from '@angular/core';
import * as ss from 'simple-statistics';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  mean(values: number[]) {
    return ss.mean(values);
  }

  median(values: number[]) {
    return ss.median(values);
  }

  mode(values: number[]) {
    try {
      return ss.mode(values);
    } catch {
      return null;
    }
  }

  std(values: number[]) {
    return ss.standardDeviation(values);
  }

  z(x: number, mean: number, std: number) {
    return (x - mean) / std;
  }

  frequencies(values: (string | number)[]) {
    const map: any = {};
    values.forEach((v) => (map[v] = (map[v] || 0) + 1));
    return map;
  }
}
