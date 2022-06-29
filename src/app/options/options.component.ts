import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ColorData } from '../shared/color.model';
import { STORAGE_COLORS } from '../shared/storage.constant';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent implements OnInit {
  colorPicker: string = '#ffffff';
  colors: ColorData[] = [];

  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.info('options executed!');
    this.refreshColorsFromStorage();

    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (STORAGE_COLORS in changes) {
        this.refreshColorsFromStorage(true);
      }
    });
  }

  select(color: string): void {
    this.colorPicker = color;
  }

  private refreshColorsFromStorage(detectChanges: boolean = false) {
    chrome.storage.sync.get(STORAGE_COLORS, ({ colors }) => {
      this.colors = colors;
      if (detectChanges) {
        this.ref.detectChanges();
      }
    });
  }
}
