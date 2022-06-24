import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent implements OnInit {
  color = '#ffffff';
  defaultColor = this.color;

  ngOnInit(): void {
    console.info('options started!');
  }

  public setDefaultColor() {
    this.defaultColor = this.color;
  }
}
