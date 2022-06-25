import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { OptionsRoutingModule } from './options-routing.module';
import { OptionsComponent } from './options.component';

@NgModule({
  declarations: [OptionsComponent],
  imports: [CommonModule, OptionsRoutingModule, SharedModule],
})
export class OptionsModule {}
