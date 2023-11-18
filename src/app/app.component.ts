import { AfterViewInit, Component } from '@angular/core';

import { ConfigService } from './services/config.service';
import { StepCounterService } from './services/step-counter.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  config$ = this.configService.config$;

  public appPages = [
    {
      title: 'Move',
      url: '/move',
      icon: '1f45f'
    },
    {
      title: 'Preferences',
      url: '/preferences',
      icon: '2699'
    },
  ];

  constructor(private configService: ConfigService, private stepCounterService: StepCounterService) {

  }

  ngAfterViewInit() {
    this.stepCounterService.startChase();
  }
}
