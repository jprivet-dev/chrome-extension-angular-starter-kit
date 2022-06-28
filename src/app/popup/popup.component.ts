import { Component, OnInit } from '@angular/core';
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
  color: string = '';

  ngOnInit() {
    console.info('popup executed!');

    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      const host = getHostFromTab(tab);
      chrome.storage.sync.get('colors', ({ colors }) => {
        this.color = getColorTextByHost(colors, host);
      });
    });
  }

  select(color: string): void {
    this.color = color;
  }

  setColor(): void {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      const host = getHostFromTab(tab);
      chrome.storage.sync.get('colors', ({ colors }) => {
        chrome.storage.sync
          .set({ colors: setColorByHost(colors, host, this.color) })
          .then(() => this.executeScript(tab));
      });
    });
  }

  removeColor(): void {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      const host = getHostFromTab(tab);
      chrome.storage.sync.get('colors', ({ colors }) => {
        chrome.storage.sync
          .set({ colors: removeColorByHost(colors, host) })
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
