import { Component } from '@angular/core';

@Component({
  selector: 'app-options-preset-colors',
  templateUrl: './options-preset-colors.component.html',
  styleUrls: ['./options-preset-colors.component.scss'],
})
export class OptionsPresetColorsComponent {
  colorPicker: string = '#ffffff';

  select(color: string): void {
    this.colorPicker = color;
  }
}
