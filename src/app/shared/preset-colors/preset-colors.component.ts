import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-preset-colors',
  templateUrl: './preset-colors.component.html',
  styleUrls: ['./preset-colors.component.scss'],
})
export class PresetColorsComponent {
  @Input() color: string = '#ffffff';
  @Output() selectEvent = new EventEmitter<string>();

  index: number = 0;
  presetColors: string[] = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];

  setColor(): void {
    this.presetColors[this.index] = this.color;
  }

  select(i: number): void {
    this.index = i;
    const color = this.presetColors[this.index];
    this.selectEvent.emit(color);
  }

  colorize(color: string): void {
    this.presetColors[this.index] = color;
  }
}
