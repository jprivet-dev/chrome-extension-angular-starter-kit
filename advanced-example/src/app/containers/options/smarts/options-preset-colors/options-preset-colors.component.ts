import { Component, OnDestroy, OnInit } from '@angular/core';
import { PresetColorsService } from '@shared/services/preset-colors.service';
import { combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'app-options-preset-colors',
  templateUrl: './options-preset-colors.component.html',
  styleUrls: ['./options-preset-colors.component.scss'],
})
export class OptionsPresetColorsComponent implements OnInit, OnDestroy {
  colorPicker!: string;

  readonly colors$ = this.presetColorsService.colors$;
  readonly reset$ = this.presetColorsService.reset$;
  readonly index$ = this.presetColorsService.index$;

  private subscription: Subscription = new Subscription();

  constructor(private presetColorsService: PresetColorsService) {}

  ngOnInit(): void {
    this.presetColorsService.load();
    this.presetColorsService.first();

    this.subscription = combineLatest(this.colors$, this.index$).subscribe(
      () => {
        this.colorPicker = this.presetColorsService.getCurrentColor();
      }
    );
  }

  select(index: number): void {
    this.presetColorsService.select(index);
  }

  colorize(color: string): void {
    this.presetColorsService.setCurrentColor(color);
  }

  reset(): void {
    this.presetColorsService.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
