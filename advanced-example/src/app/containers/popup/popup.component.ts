import { Component, OnDestroy, OnInit } from '@angular/core';
import { PopupService } from '@shared/services/popup.service';
import { PresetColorsStoreService } from '@shared/services/preset-colors-store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit, OnDestroy {
  colorPicker: string = '';

  readonly colorPicker$ = this.popupService.colorPicker$;
  readonly host$ = this.popupService.host$;
  readonly hasBorderColor$ = this.popupService.hasBorderColor$;
  readonly presetColors$ = this.presetColorsStore.presetColors$;

  private subscription: Subscription = new Subscription();

  constructor(
    private popupService: PopupService,
    private presetColorsStore: PresetColorsStoreService
  ) {}

  ngOnInit() {
    console.info('popup works!');
    this.presetColorsStore.load();
    this.subscription = this.colorPicker$.subscribe((colorPicker) => {
      this.colorPicker = colorPicker;
    });
  }

  select(index: number): void {
    this.presetColorsStore.select(index);
    this.popupService.setColorPicker(this.presetColorsStore.getCurrent());
  }

  setBorderColor(): void {
    this.popupService.setBorderColor(this.popupService.getColorPicker());
  }

  removeBorderColor(): void {
    this.popupService.removeBorderColor();
  }

  openOptionsPage(): void {
    chrome.runtime.openOptionsPage();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
