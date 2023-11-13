import { Component, OnInit } from '@angular/core';

import { ConfigService } from './services/config.service';

import { Config } from './config';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  config: Promise<Config> = this.configService.getConfig();

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

  constructor(private configService: ConfigService) {

  }

  ngOnInit() {
    this.configService.configChanged.subscribe(() => this.config = this.configService.getConfig());
  }
}
