import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AppliedColorsService } from '@shared/services/applied-colors.service';
import { CurrentTabService } from '@shared/services/current-tab.service';
import { PresetColorsService } from '@shared/services/preset-colors.service';
import { combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit, OnDestroy {
  colorPicker: string = '';

  readonly presetColors$ = this.presetColorsService.presetColors$;
  readonly appliedColors$ = this.appliedColorsService.appliedColors$;

  readonly authorized$ = this.currentTabService.authorized$;
  readonly host$ = this.currentTabService.host$;
  readonly hasBorderColor$ = this.currentTabService.hasBorderColor$;
  readonly borderColor$ = this.currentTabService.borderColor$;

  private DEFAULT_COLOR: string = '#ffffff';
  private subscription: Subscription = new Subscription();

  constructor(
    private ref: ChangeDetectorRef,
    private presetColorsService: PresetColorsService,
    private appliedColorsService: AppliedColorsService,
    private currentTabService: CurrentTabService
  ) {}

  ngOnInit() {
    console.info('popup works!');
    this.presetColorsService.load();
    this.appliedColorsService.load();
    this.currentTabService.load();

    this.subscription.add(
      this.borderColor$.subscribe((borderColor) => {
        this.colorPicker =
          borderColor === '' ? this.DEFAULT_COLOR : borderColor;
      })
    );

    // TODO: analyse and improve this trick, related to chrome.storage.sync
    //  and BehaviorSubject in the PresetColorsService & AppliedColorsService.
    this.subscription.add(
      combineLatest(this.presetColors$, this.appliedColors$).subscribe(() =>
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
