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

  onClick(action: string) {
    switch (action) {
      case 'start':
        this.stepCounterService.startChase();

        break;
      case 'pause':
        this.stepCounterService.pauseChase();

        break;
      case 'stop':
        this.stepCounterService.stopChase();

        break;
      default:
        // do nothing
        break;
    }
  }
}
