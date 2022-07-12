import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CurrentTabService } from '@shared/services/current-tab.service';
import { PresetColorsStoreService } from '@shared/services/preset-colors-store.service';
import { Subscription } from 'rxjs';
import { PopupService } from './popup.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit, OnDestroy {
  colorPicker: string = '';

  readonly colorPicker$ = this.popupService.colorPicker$;
  readonly authorized$ = this.currentTabService.authorized$;
  readonly host$ = this.currentTabService.host$;
  readonly hasBorderColor$ = this.popupService.hasBorderColor$;
  readonly presetColors$ = this.presetColorsStore.colors$;

  private subscription: Subscription = new Subscription();

  constructor(
    private ref: ChangeDetectorRef,
    private popupService: PopupService,
    private presetColorsStore: PresetColorsStoreService,
    private currentTabService: CurrentTabService
  ) {}

  ngOnInit() {
    console.info('popup works!');
    this.presetColorsStore.load();

    this.subscription.add(
      this.colorPicker$.subscribe((colorPicker) => {
        this.colorPicker = colorPicker;
      })
    );

    // TODO: analyse and improve this trick, related to chrome.storage.sync
    //  and BehaviorSubject in the PresetColorsStoreService.
    this.subscription.add(
      this.presetColors$.subscribe(() =>
        setTimeout(() => this.ref.detectChanges())
      )
    );
  }

  select(index: number): void {
    this.presetColorsStore.select(index);
    this.popupService.setColorPicker(this.presetColorsStore.getCurrentColor());
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
