import { Component, OnInit } from '@angular/core';
import { STORAGE_COLORS } from '../shared/storage.constant';
import {
  getColorTextByHost,
  getHostFromTab,
  removeColorByHost,
  setColorByHost,
} from '../shared/utils';
import Tab = chrome.tabs.Tab;

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {
  colorPicker: string = '';

  ngOnInit() {
    console.info('popup executed!');

    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      const host = getHostFromTab(tab);
      chrome.storage.sync.get(STORAGE_COLORS, ({ colors }) => {
        this.colorPicker = getColorTextByHost(colors, host);
      });
    });
  }

  select(color: string): void {
    this.colorPicker = color;
  }

  setColor(): void {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      chrome.storage.sync.get(STORAGE_COLORS, ({ colors }) => {
        chrome.storage.sync
          .set({
            [STORAGE_COLORS]: setColorByHost(
              colors,
              getHostFromTab(tab),
              this.colorPicker
            ),
          })
          .then(() => this.executeScript(tab));
      });
    });
  }

  removeColor(): void {
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

  openOptionsPage(): void {
    chrome.runtime.openOptionsPage();
  }

  private executeScript(tab: Tab) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id as number },
      files: ['content.js', 'runtime.js'],
    });
  }
}
