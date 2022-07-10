import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ColorData } from '../color.model';
import { STORAGE_COLORS } from '../storage.constant';

@Injectable({
  providedIn: 'root',
})
export class AppliedColorsStoreService {
  private colorsSubject = new BehaviorSubject<ColorData[]>([]);
  readonly appliedColors$ = this.colorsSubject.asObservable();

  constructor() {
    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (STORAGE_COLORS in changes) {
        this.load();
      }
    });
  }

  load(): void {
    chrome.storage.sync.get(STORAGE_COLORS, ({ colors }) => {
      this.colorsSubject.next(colors);
    });
  }
}
