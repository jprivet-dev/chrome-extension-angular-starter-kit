import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ColorPickerModule } from 'ngx-color-picker';

import { PopupRoutingModule } from './popup-routing.module';
import { PopupComponent } from './popup.component';

@NgModule({
  declarations: [PopupComponent],
  imports: [CommonModule, PopupRoutingModule, ColorPickerModule],
})
export class PopupModule {}
