import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CurrentTabService } from '@shared/services/current-tab.service';
import { PresetColorsService } from '@shared/services/preset-colors.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit, OnDestroy {
  colorPicker: string = '';

  readonly authorized$ = this.currentTabService.authorized$;
  readonly host$ = this.currentTabService.host$;
  readonly hasBorderColor$ = this.currentTabService.hasBorderColor$;
  readonly borderColor$ = this.currentTabService.borderColor$;
  readonly presetColors$ = this.presetColorsService.colors$;

  private DEFAULT_COLOR: string = '#ffffff';
  private subscription: Subscription = new Subscription();

  constructor(
    private ref: ChangeDetectorRef,
    private presetColorsService: PresetColorsService,
    private currentTabService: CurrentTabService
  ) {}

  ngOnInit() {
    console.info('popup works!');
    this.presetColorsService.load();

    this.subscription.add(
      this.borderColor$.subscribe((borderColor) => {
        this.colorPicker =
          borderColor === '' ? this.DEFAULT_COLOR : borderColor;
      })
    );

    // TODO: analyse and improve this trick, related to chrome.storage.sync
    //  and BehaviorSubject in the PresetColorsService.
    this.subscription.add(
      this.presetColors$.subscribe(() =>
        setTimeout(() => this.ref.detectChanges())
      )
    );
  }

  select(index: number): void {
    this.presetColorsService.select(index);
    this.colorPicker = this.presetColorsService.getCurrentColor();
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
