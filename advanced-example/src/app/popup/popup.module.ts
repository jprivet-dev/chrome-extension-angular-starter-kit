import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PopupRoutingModule } from './popup-routing.module';
import { PopupComponent } from './popup.component';

@NgModule({
  declarations: [PopupComponent],
  imports: [CommonModule, PopupRoutingModule, SharedModule],
})
export class PopupModule {}
