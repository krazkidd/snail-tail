import { Component, Input } from '@angular/core';

import { StepCounterService } from 'src/app/services/step-counter.service';
import { AppHeaderComponent } from '../app-header/app-header.component';

@Component({
  selector: 'app-header-condensed',
  templateUrl: './app-header-condensed.component.html',
  styleUrls: ['./app-header-condensed.component.scss'],
})
export class AppHeaderCondensedComponent extends AppHeaderComponent {

  constructor(protected override stepCounterService: StepCounterService) {
    super(stepCounterService);
  }
}
