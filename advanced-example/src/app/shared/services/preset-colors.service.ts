import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  getPresetColorsFromStorage,
  onChangedPresetColorsInStorage,
  setPresetColorsInStorage,
} from '../utils';

@Injectable({
  providedIn: 'root',
})
export class PresetColorsService {
  private DEFAULT_COLORS: string[] = [
    '#3aa757',
    '#e8453c',
    '#f9bb2d',
    '#4688f1',
  ];

  private indexSubject = new BehaviorSubject<number>(0);
  readonly index$ = this.indexSubject.asObservable();

  private presetColorsSubject = new BehaviorSubject<string[]>([]);
  private presetColors: string[] = [];
  readonly presetColors$ = this.presetColorsSubject.asObservable();

  private resetSubject = new BehaviorSubject<boolean>(false);
  readonly reset$ = this.resetSubject.asObservable();

  constructor() {
    onChangedPresetColorsInStorage((presetColors) => {
      this.setPresetColors(presetColors);
    });
  }

  load(): void {
    getPresetColorsFromStorage().then((presetColors) => {
      this.setPresetColors(presetColors ?? this.DEFAULT_COLORS);
    });
  }

  first(): void {
    this.select(0);
  }

  select(index: number): void {
    this.indexSubject.next(index);
  }

  reset(): void {
    setPresetColorsInStorage(this.DEFAULT_COLORS);
  }

  setCurrentColor(color: string): void {
    this.presetColors[this.getCurrentIndex()] = color;
    setPresetColorsInStorage(this.presetColors);
  }

  getCurrentColor(): string {
    return this.presetColors[this.getCurrentIndex()];
  }

  getCurrentIndex(): number {
    return this.indexSubject.getValue();
  }

  setPresetColors(presetColors: string[]): void {
    this.presetColors = [...presetColors];
    this.presetColorsSubject.next(this.presetColors);
    const diff = this.presetColors.filter(
      (color) => !this.DEFAULT_COLORS.includes(color)
    );
    this.resetSubject.next(diff.length > 0);
  }
}
