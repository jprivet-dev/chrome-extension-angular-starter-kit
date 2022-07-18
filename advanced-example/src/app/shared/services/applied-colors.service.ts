import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppliedColor } from '../color.model';
import {
  getAppliedColorsFromStorage,
  onChangedAppliedColorsInStorage,
  removeAppliedColorByTab,
  setAppliedColorByTab,
  setAppliedColorsInStorage,
} from '../utils';
import Tab = chrome.tabs.Tab;

@Injectable({
  providedIn: 'root',
})
export class AppliedColorsService {
  private appliedColorsSubject = new BehaviorSubject<AppliedColor[]>([]);
  private appliedColors: AppliedColor[] = [];
  readonly appliedColors$ = this.appliedColorsSubject.asObservable();

  constructor() {
    onChangedAppliedColorsInStorage((appliedColors) => {
      this.setAppliedColors(appliedColors);
    });
  }

  load(): void {
    getAppliedColorsFromStorage().then((appliedColors) => {
      this.setAppliedColors(appliedColors ?? []);
    });
  }

  setAppliedColorByTab(tab: Tab, color: string): void {
    this.appliedColors = setAppliedColorByTab(this.appliedColors, tab, color);
    setAppliedColorsInStorage(this.appliedColors);
  }

  removeAppliedColorByTab(tab: Tab): void {
    this.appliedColors = removeAppliedColorByTab(this.appliedColors, tab);
    setAppliedColorsInStorage(this.appliedColors);
  }

  setAppliedColors(appliedColors: AppliedColor[]): void {
    this.appliedColors = appliedColors;
    this.appliedColorsSubject.next(this.appliedColors);
  }
}
