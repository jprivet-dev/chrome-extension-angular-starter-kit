import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent implements OnInit {
  color = '#ffffff';

  constructor() {}

  ngOnInit(): void {
    console.info('options started!');
  }
}
