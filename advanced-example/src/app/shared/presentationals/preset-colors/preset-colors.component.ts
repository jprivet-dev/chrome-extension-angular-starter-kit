import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-preset-colors',
  templateUrl: './preset-colors.component.html',
  styleUrls: ['./preset-colors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresetColorsComponent {
  @Input() presetColors: string[] | null = [];
  @Input() currentIndex: number | null = 0;
  @Input() selectionIndicator: boolean = true;
  @Output() selectEvent = new EventEmitter<number>();

  select(index: number): void {
    this.selectEvent.emit(index);
  }
}
