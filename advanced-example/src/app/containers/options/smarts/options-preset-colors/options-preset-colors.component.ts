import { Component, OnDestroy, OnInit } from '@angular/core';
import { PresetColorsStoreService } from '@shared/services/preset-colors-store.service';
import { combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'app-options-preset-colors',
  templateUrl: './options-preset-colors.component.html',
  styleUrls: ['./options-preset-colors.component.scss'],
})
export class OptionsPresetColorsComponent implements OnInit, OnDestroy {
  colorPicker!: string;

  readonly colors$ = this.presetColorsStore.colors$;
  readonly reset$ = this.presetColorsStore.reset$;
  readonly index$ = this.presetColorsStore.index$;

  private subscription: Subscription = new Subscription();

  constructor(private presetColorsStore: PresetColorsStoreService) {}

  ngOnInit(): void {
    this.presetColorsStore.load();
    this.presetColorsStore.first();

    this.subscription = combineLatest(this.colors$, this.index$).subscribe(
      () => {
        this.colorPicker = this.presetColorsStore.getCurrentColor();
      }
    );
  }

  select(index: number): void {
    this.presetColorsStore.select(index);
  }

  colorize(color: string): void {
    this.presetColorsStore.setCurrentColor(color);
  }

  reset(): void {
    this.presetColorsStore.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
