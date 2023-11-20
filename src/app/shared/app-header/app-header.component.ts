import { Component, Input, OnInit } from '@angular/core';

import { StepCounterService } from 'src/app/services/step-counter.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent  implements OnInit {

  @Input({
    required: true
  })
  title: string = '';

  timerStatus$ = this.stepCounterService.timerState$;

  constructor(protected stepCounterService: StepCounterService) {

  }

  ngOnInit() {

  }

  onClick(timerState: 'started' | 'paused' | 'stopped') {
    this.stepCounterService.changeMode(timerState);
  }
}
