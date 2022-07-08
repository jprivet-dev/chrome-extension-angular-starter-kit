import { Component, OnInit } from '@angular/core';
import { PresetColorsStoreService } from '@shared/services/preset-colors-store.service';

@Component({
  selector: 'app-options-preset-colors',
  templateUrl: './options-preset-colors.component.html',
  styleUrls: ['./options-preset-colors.component.scss'],
})
export class OptionsPresetColorsComponent implements OnInit {
  colorPicker: string = '#ffffff';
  readonly presetColors$ = this.presetColorsStore.presetColors$;
  readonly currentIndex$ = this.presetColorsStore.currentIndex$;

  constructor(private presetColorsStore: PresetColorsStoreService) {}

  ngOnInit(): void {
    this.presetColorsStore.loadAll(() => {
      this.select(0);
    });
  }

  select(index: number): void {
    this.presetColorsStore.select(index);
    this.colorPicker = this.presetColorsStore.getCurrent();
  }

  colorize(color: string): void {
    this.presetColorsStore.setCurrent(color);
  }

  reset(): void {
    this.presetColorsStore.reset();
  }
}
