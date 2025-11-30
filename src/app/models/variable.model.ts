export interface VariableInfo {
  name: string;
  type: 'discreta' | 'continua';
  description?: string;
  values: number[] | string[];
}
