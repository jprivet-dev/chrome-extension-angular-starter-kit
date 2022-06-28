import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent implements OnInit {
  color: string = '#ffffff';

  ngOnInit(): void {
    console.info('options executed!');
  }

  select(color: string): void {
    this.color = color;
  }
}
