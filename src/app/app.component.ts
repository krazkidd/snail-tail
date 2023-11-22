import { Component } from '@angular/core';

import { ConfigService } from './services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
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
    {
      title: 'About',
      url: '/about',
      icon: '2139'
    },
  ];

  constructor(private configService: ConfigService) {

  }

}
