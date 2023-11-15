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
  config: Promise<Config> = this.configService.getConfig();

  userSteps: number = this.stepCounterService.userSteps;
  tailSteps: number = this.stepCounterService.tailSteps;
  estimatedTimeRemaining_m: number = 0;

  isUserCaught = this.stepCounterService.isUserCaught;

  constructor(private configService: ConfigService, private stepCounterService: StepCounterService) {

  }

  ngOnInit() {
    this.configService.configChanged.subscribe(() => this.config = this.configService.getConfig());

    this.stepCounterService.stepsCounted.subscribe(({ userSteps, tailSteps, estimatedTimeRemaining_m }) => {
      this.userSteps = userSteps;
      this.tailSteps = tailSteps;
      this.estimatedTimeRemaining_m = estimatedTimeRemaining_m;
    });

    this.stepCounterService.userCaught.subscribe(() => this.isUserCaught = this.stepCounterService.isUserCaught);
  }

}
