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
  config: Promise<Config> = this.configService.config;

  isUserCaught = this.stepCounterService.isUserCaught;

  constructor(private configService: ConfigService, private stepCounterService: StepCounterService) {

  }

  ngOnInit() {
    this.stepCounterService.userCaught.subscribe(() => {
      this.isUserCaught = this.stepCounterService.isUserCaught;
    });
  }

}
