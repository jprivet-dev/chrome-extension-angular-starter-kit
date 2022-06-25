import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ColorPickerModule } from 'ngx-color-picker';
import { PresetColorsComponent } from './preset-colors/preset-colors.component';

@NgModule({
  declarations: [PresetColorsComponent],
  exports: [ColorPickerModule, PresetColorsComponent],
  imports: [CommonModule, ColorPickerModule],
})
export class SharedModule {}
