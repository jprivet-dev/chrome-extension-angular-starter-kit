import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CurrentTabService } from '@shared/services/current-tab.service';
import { PresetColorsStoreService } from '@shared/services/preset-colors-store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit, OnDestroy {
  colorPicker: string = '';

  readonly presetColors$ = this.presetColorsStore.colors$;
  readonly authorized$ = this.currentTabService.authorized$;
  readonly host$ = this.currentTabService.host$;
  readonly hasBorderColor$ = this.currentTabService.hasBorderColor$;
  readonly borderColor$ = this.currentTabService.borderColor$;

  private DEFAULT_COLOR: string = '#ffffff';
  private subscription: Subscription = new Subscription();

  constructor(
    private ref: ChangeDetectorRef,
    private presetColorsStore: PresetColorsStoreService,
    private currentTabService: CurrentTabService
  ) {}

  ngOnInit() {
    console.info('popup works!');
    this.presetColorsStore.load();

    this.subscription.add(
      this.borderColor$.subscribe((borderColor) => {
        this.colorPicker =
          borderColor === '' ? this.DEFAULT_COLOR : borderColor;
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
    this.colorPicker = this.presetColorsStore.getCurrentColor();
  }

  setBorderColor(): void {
    this.currentTabService.setBorderColor(this.colorPicker);
  }

  removeBorderColor(): void {
    this.currentTabService.removeBorderColor();
  }

  openOptionsPage(): void {
    chrome.runtime.openOptionsPage();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
