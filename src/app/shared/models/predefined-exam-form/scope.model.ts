export class Scope {
  minValue: number;
  maxValue: number;
  unit: string;


  constructor(minValue?: number, maxValue?: number, unit?: string) {
    this.minValue = minValue || 0;
    this.maxValue = maxValue || 0;
    this.unit = unit || '';
  }
}
