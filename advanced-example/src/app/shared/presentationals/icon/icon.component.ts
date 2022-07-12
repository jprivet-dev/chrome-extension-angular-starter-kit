import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  @Input() name!: 'arrow-rotate-left' | 'github' | 'xcross' | 'gear';
  @Input() width: number = 16;
  constructor() {}
}
