import { Component, OnInit } from '@angular/core';

import { ConfigService } from '../../services/config.service';
import { StepCounterService } from '../../services/step-counter.service';

import { Config } from '../../config.model';

@Component({
  selector: 'app-step-counter',
  templateUrl: './step-counter.component.html',
  styleUrls: ['./step-counter.component.scss'],
})
export class StepCounterComponent  implements OnInit {
  config: Config = this.configService.config;

  userSteps: number = this.stepCounter.userSteps;
  tailSteps: number = this.stepCounter.tailSteps;

  constructor(private configService: ConfigService, private stepCounter: StepCounterService)
  {

  }

  ngOnInit(): void {
    this.stepCounter.stepsCounted.subscribe(({ userSteps, tailSteps }) => {
      this.userSteps = userSteps;
      this.tailSteps = tailSteps;
    });
  }

}
