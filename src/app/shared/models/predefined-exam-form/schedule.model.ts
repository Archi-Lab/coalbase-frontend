export class Schedule {
  value: string;

  constructor();
  constructor(value: string);
  constructor(value?: string) {
    this.value = value || '';
  }
}
