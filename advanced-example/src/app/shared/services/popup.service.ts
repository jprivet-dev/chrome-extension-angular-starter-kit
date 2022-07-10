import { Injectable } from '@angular/core';
import { STORAGE_COLORS } from '@shared/storage.constant';
import {
  getColorTextByHost,
  getHostFromTab,
  removeColorByHost,
  setColorByHost,
} from '@shared/utils';
import { BehaviorSubject } from 'rxjs';
import Tab = chrome.tabs.Tab;

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  private hostSubject = new BehaviorSubject<string>('');
  readonly host$ = this.hostSubject.asObservable();

  private colorPickerSubject = new BehaviorSubject<string>('');
  readonly colorPicker$ = this.colorPickerSubject.asObservable();

  constructor() {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      this.setHost(getHostFromTab(tab));
      chrome.storage.sync.get(STORAGE_COLORS, ({ colors }) => {
        this.setColorPicker(getColorTextByHost(colors, this.getHost()));
      });
    });
  }

  setHost(host: string): void {
    this.hostSubject.next(host);
  }

  getHost(): string {
    return this.hostSubject.getValue();
  }

  setColorPicker(color: string): void {
    this.colorPickerSubject.next(color);
  }

  getColorPicker(): string {
    return this.colorPickerSubject.getValue();
  }

  setBorderColor(color: string): void {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      chrome.storage.sync.get(STORAGE_COLORS, ({ colors }) => {
        chrome.storage.sync
          .set({
            [STORAGE_COLORS]: setColorByHost(
              colors,
              getHostFromTab(tab),
              color
            ),
          })
          .then(() => this.executeScript(tab));
      });
    });
  }

  removeBorderColor(): void {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      chrome.storage.sync.get(STORAGE_COLORS, ({ colors }) => {
        chrome.storage.sync
          .set({
            [STORAGE_COLORS]: removeColorByHost(colors, getHostFromTab(tab)),
          })
          .then(() => this.executeScript(tab));
      });
    });
  }

  private executeScript(tab: Tab) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id as number },
      files: ['content.js', 'runtime.js'],
    });
  }
}
