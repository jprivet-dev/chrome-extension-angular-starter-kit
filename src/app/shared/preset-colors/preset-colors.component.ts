import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-preset-colors',
  templateUrl: './preset-colors.component.html',
  styleUrls: ['./preset-colors.component.scss'],
})
export class PresetColorsComponent implements OnInit {
  @Input() color: string = '#ffffff';
  @Output() selectEvent = new EventEmitter<string>();

  index: number = 0;
  presetColors: string[] = [];

  private initColors: string[] = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];

  ngOnInit() {
    chrome.storage.sync.get('presetColors', ({ presetColors }) => {
      this.presetColors = presetColors ?? [...this.initColors];
    });
  }

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
    chrome.storage.sync.set({ presetColors: this.presetColors });
  }

  reset(): void {
    this.presetColors = [...this.initColors];
    chrome.storage.sync.set({ presetColors: this.presetColors });
    this.select(this.index);
  }
}
