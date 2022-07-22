import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ColorPickerModule } from 'ngx-color-picker';
import { IconComponent } from './presentationals/icon/icon.component';
import { PresetColorsComponent } from './presentationals/preset-colors/preset-colors.component';

@NgModule({
  declarations: [PresetColorsComponent, IconComponent],
  exports: [ColorPickerModule, PresetColorsComponent, IconComponent],
  imports: [CommonModule, ColorPickerModule],
})
export class SharedModule {}
