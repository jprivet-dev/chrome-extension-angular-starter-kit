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

  private indexSubject = new BehaviorSubject<number>(0);
  readonly index$ = this.indexSubject.asObservable();

  private colorsSubject = new BehaviorSubject<string[]>([]);
  private colors: string[] = [];
  readonly colors$ = this.colorsSubject.asObservable();

  private resetSubject = new BehaviorSubject<boolean>(false);
  readonly reset$ = this.resetSubject.asObservable();

  constructor() {
    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (STORAGE_PRESET_COLORS in changes) {
        this.load();
      }
    });
  }

  load(): void {
    chrome.storage.sync.get(STORAGE_PRESET_COLORS, ({ presetColors }) => {
      this.colors = presetColors ?? [...this.DEFAULT_COLORS];
      this.refreshColors(this.colors);
    });
  }

  first(): void {
    this.select(0);
  }

  select(index: number): void {
    this.indexSubject.next(index);
  }

  reset(): void {
    this.colors = [...this.DEFAULT_COLORS];
    this.refreshStorage(this.colors);
  }

  setCurrentColor(color: string): void {
    this.colors[this.getCurrentIndex()] = color;
    this.refreshStorage(this.colors);
  }

  getCurrentColor(): string {
    return this.colors[this.getCurrentIndex()];
  }

  getCurrentIndex(): number {
    return this.indexSubject.getValue();
  }

  private refreshStorage(colors: string[]): void {
    chrome.storage.sync
      .set({ [STORAGE_PRESET_COLORS]: colors })
      .then(() => this.refreshColors(colors));
  }

  private refreshColors(colors: string[]) {
    this.colorsSubject.next(colors);
    const diff = colors.filter((color) => !this.DEFAULT_COLORS.includes(color));
    this.resetSubject.next(diff.length > 0);
  }
}
