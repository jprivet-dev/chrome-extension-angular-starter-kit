import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { STORAGE_PRESET_COLORS } from '../storage.constant';

@Injectable({
  providedIn: 'root',
})
export class PresetColorsStoreService {
  private init: string[] = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];

  private currentIndexSubject = new BehaviorSubject<number>(0);
  readonly currentIndex$ = this.currentIndexSubject.asObservable();

  private presetColorsSubject = new BehaviorSubject<string[]>([]);
  private presetColors: string[] = [];
  readonly presetColors$ = this.presetColorsSubject.asObservable();

  constructor() {}

  loadAll(callback?: Function): void {
    chrome.storage.sync.get(STORAGE_PRESET_COLORS, ({ presetColors }) => {
      this.presetColors = presetColors ?? [...this.init];
      this.presetColorsSubject.next(this.presetColors);
      if (callback) {
        callback();
      }
    });
  }

  select(index: number): void {
    this.currentIndexSubject.next(index);
  }

  reset(): void {
    this.presetColors = [...this.init];
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
      .then(() => {
        this.presetColorsSubject.next(presetColors);
      });
  }
}
