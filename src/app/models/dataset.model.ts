export interface Dataset {
  name: string;
  source: string;
  description?: string;
  data: any[];
  columns: string[];
}
