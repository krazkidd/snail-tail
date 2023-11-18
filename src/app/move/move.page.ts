import { Component } from '@angular/core';

import { ConfigService } from '../services/config.service';
import { StepCounterService } from '../services/step-counter.service';

@Component({
  selector: 'app-move',
  templateUrl: './move.page.html',
  styleUrls: ['./move.page.scss'],
})
export class MovePage {
  config$ = this.configService.config$;
  stepsCounted$ = this.stepCounterService.stepsCounted$;

  constructor(private configService: ConfigService, private stepCounterService: StepCounterService) {

  }

}
