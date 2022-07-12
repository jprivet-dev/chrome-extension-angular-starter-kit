import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { STORAGE_PRESET_COLORS } from '../storage.constant';

@Injectable({
  providedIn: 'root',
})
export class PresetColorsStoreService {
  private DEFAULT_COLORS: string[] = [
    '#3aa757',
    '#e8453c',
    '#f9bb2d',
    '#4688f1',
  ];

  private currentIndexSubject = new BehaviorSubject<number>(0);
  readonly currentIndex$ = this.currentIndexSubject.asObservable();

  private presetColorsSubject = new BehaviorSubject<string[]>([]);
  private presetColors: string[] = [];
  readonly presetColors$ = this.presetColorsSubject.asObservable();

  private activeResetSubject = new BehaviorSubject<boolean>(false);
  readonly activeReset$ = this.activeResetSubject.asObservable();

  constructor() {
    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (STORAGE_PRESET_COLORS in changes) {
        this.load();
      }
    });
  }

  load(): void {
    chrome.storage.sync.get(STORAGE_PRESET_COLORS, ({ presetColors }) => {
      this.presetColors = presetColors ?? [...this.DEFAULT_COLORS];
      this.refreshPresetColors(this.presetColors);
    });
  }

  select(index: number): void {
    this.currentIndexSubject.next(index);
  }

  reset(): void {
    this.presetColors = [...this.DEFAULT_COLORS];
    this.refreshStorage(this.presetColors);
  }

  setCurrent(color: string): void {
    this.presetColors[this.getCurrentIndex()] = color;
    this.refreshStorage(this.presetColors);
  }

  getCurrent(): string {
    return this.presetColors[this.getCurrentIndex()];
  }

  getCurrentIndex(): number {
    return this.currentIndexSubject.getValue();
  }

  private refreshStorage(presetColors: string[]): void {
    chrome.storage.sync
      .set({ [STORAGE_PRESET_COLORS]: presetColors })
      .then(() => this.refreshPresetColors(presetColors));
  }

  private refreshPresetColors(presetColors: string[]) {
    this.presetColorsSubject.next(presetColors);

    const diff = presetColors.filter(
      (color) => !this.DEFAULT_COLORS.includes(color)
    );
    this.activeResetSubject.next(diff.length > 0);
  }
}
