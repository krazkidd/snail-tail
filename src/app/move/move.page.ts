import { Component, OnInit } from '@angular/core';

import { ConfigService } from '../services/config.service';
import { StepCounterService } from '../services/step-counter.service';

import { Config } from '../config';

@Component({
  selector: 'app-move',
  templateUrl: './move.page.html',
  styleUrls: ['./move.page.scss'],
})
export class MovePage implements OnInit {
  config$ = this.configService.config$;

  userSteps: number = this.stepCounterService.userSteps;
  tailSteps: number = this.stepCounterService.tailSteps;
  isUserCaught = false;
  estimatedTimeRemaining_m: number = 0;

  constructor(private configService: ConfigService, private stepCounterService: StepCounterService) {

  }

  ngOnInit() {
    this.stepCounterService.stepsCounted.subscribe(({ userSteps, tailSteps, isUserCaught, estimatedTimeRemaining_m }) => {
      this.userSteps = userSteps;
      this.tailSteps = tailSteps;
      this.isUserCaught = isUserCaught;
      this.estimatedTimeRemaining_m = estimatedTimeRemaining_m;
    });
  }

}
