import { Component, OnInit } from '@angular/core';
import { colorPickerApply } from '../helpers/color-picker.helpers';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {
  color = '#ffffff';

  ngOnInit(): void {
    console.info('popup started!');
  }

  public colorize() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id as number },
        func: colorPickerApply,
        args: [this.color],
      });
    });
  }
}
