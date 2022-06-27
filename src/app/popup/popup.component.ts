import { Component, OnInit } from '@angular/core';
import { applyPageBackgroundColorFromStorage } from '../utils';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {
  color: string = '#ffffff';

  ngOnInit() {
    console.info('popup started!');
    chrome.storage.sync.get('color', ({ color }) => {
      this.color = color;
    });
  }

  select(color: string): void {
    this.color = color;
  }

  colorize(): void {
    chrome.tabs.query({ active: true, currentWindow: true }, ([currentTab]) => {
      chrome.storage.sync.set({ color: this.color }).then(() => {
        chrome.scripting.executeScript({
          target: { tabId: currentTab.id as number },
          func: applyPageBackgroundColorFromStorage,
        });
      });
    });
  }

  removeColor(): void {
    chrome.tabs.query({ active: true, currentWindow: true }, ([currentTab]) => {
      chrome.storage.sync.remove('color').then(() => {
        chrome.scripting.executeScript({
          target: { tabId: currentTab.id as number },
          func: applyPageBackgroundColorFromStorage,
        });
      });
    });
  }

  openOptionsPage(): void {
    chrome.runtime.openOptionsPage();
  }
}
