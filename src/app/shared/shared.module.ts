import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ColorPickerModule } from 'ngx-color-picker';
import { ColorPickerComponent } from './color-picker/color-picker.component';

@NgModule({
  declarations: [ColorPickerComponent],
  imports: [CommonModule, ColorPickerModule],
  exports: [ColorPickerComponent],
})
export class SharedModule {}
