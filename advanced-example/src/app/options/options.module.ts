import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { OptionsRoutingModule } from './options-routing.module';
import { OptionsComponent } from './options.component';
import { OptionsPresetColorsComponent } from './components/options-preset-colors/options-preset-colors.component';
import { OptionsAppliedColorsComponent } from './components/options-applied-colors/options-applied-colors.component';

@NgModule({
  declarations: [OptionsComponent, OptionsPresetColorsComponent, OptionsAppliedColorsComponent],
  imports: [CommonModule, OptionsRoutingModule, SharedModule],
})
export class OptionsModule {}
