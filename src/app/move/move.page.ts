import { Component } from '@angular/core';
import { combineLatest, map } from 'rxjs';

import { ConfigService } from '../services/config.service';
import { StepCounterService } from '../services/step-counter.service';

@Component({
  selector: 'app-move',
  templateUrl: './move.page.html',
  styleUrls: ['./move.page.scss'],
})
export class MovePage {
  latest$ = combineLatest([
    this.configService.config$,
    this.stepCounterService.timerState$,
    this.stepCounterService.stepsCounted$,
  ]).pipe(map(([ config, timerState, stepsCounted ]) => ({ config, timerState, stepsCounted })));

  constructor(private configService: ConfigService, private stepCounterService: StepCounterService) {

  }

}
