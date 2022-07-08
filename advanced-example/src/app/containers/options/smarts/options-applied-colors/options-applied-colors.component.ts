import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ColorData } from '@shared/color.model';
import { STORAGE_COLORS } from '@shared/storage.constant';

@Component({
  selector: 'app-options-applied-colors',
  templateUrl: './options-applied-colors.component.html',
  styleUrls: ['./options-applied-colors.component.scss'],
})
export class OptionsAppliedColorsComponent implements OnInit {
  colors: ColorData[] = [];

  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.refreshColorsFromStorage();

    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (STORAGE_COLORS in changes) {
        this.refreshColorsFromStorage(true);
      }
    });
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