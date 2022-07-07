import { Component } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent {
  colorPicker: string = '';

  setBorderColor(): void {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      chrome.storage.sync.set({ borderColor: this.colorPicker }).then(() => {
        chrome.scripting.executeScript({
          target: { tabId: tab.id as number },
          files: ['content.js', 'runtime.js'],
        });
      });
    });
  }
}
