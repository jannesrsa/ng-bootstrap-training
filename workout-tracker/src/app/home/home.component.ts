import { Component, OnInit, ViewChild } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public stepComplete: number = 0;
  @ViewChild('acc', { static: false }) acc: any;

  constructor() { }

  ngOnInit() {
  }

  nextButton(step: number) {
    this.stepComplete = step;
    this.acc.toggle(`panel${this.stepComplete + 1}`);
  }

  beforeChange($event): void {
    if ($event.panelId === 'panel2' && this.stepComplete < 1) {
      $event.preventDefault();
    }

    if ($event.panelId === 'panel3' && this.stepComplete < 2) {
      $event.preventDefault();
    }
  }

}
