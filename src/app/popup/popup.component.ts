import { Component, OnInit } from '@angular/core';
import { setPageBackgroundColor } from '../helpers/color.helpers';

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
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id as number },
        func: setPageBackgroundColor,
        args: [this.color],
      });

      chrome.storage.sync.set({ color: this.color });
    });
  }

  openOptionsPage(): void {
    chrome.runtime.openOptionsPage();
  }
}
