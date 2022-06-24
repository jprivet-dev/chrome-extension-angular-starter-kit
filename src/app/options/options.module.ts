import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ColorPickerModule } from 'ngx-color-picker';
import { OptionsRoutingModule } from './options-routing.module';
import { OptionsComponent } from './options.component';

@NgModule({
  declarations: [OptionsComponent],
  imports: [CommonModule, OptionsRoutingModule, ColorPickerModule],
})
export class OptionsModule {}
