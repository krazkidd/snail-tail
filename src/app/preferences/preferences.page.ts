import { Component, OnInit } from '@angular/core';

import { ConfigService } from '../services/config.service';

import { UserAvatar } from '../user-avatar';
import { TailAvatar } from '../tail-avatar';

import { AVATARS_USER, AVATARS_TAIL } from '../constants';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.page.html',
  styleUrls: ['./preferences.page.scss'],
})
export class PreferencesPage implements OnInit {
  config = this.configService.config;

  userAvatars: UserAvatar[] = AVATARS_USER;
  tailAvatars: TailAvatar[] = AVATARS_TAIL;

  constructor(private configService: ConfigService) {

  }

  ngOnInit() {

  }

  onChange(partialConfig: any) {
    this.configService.config = {
      ...this.configService.config,
      ...partialConfig
    };

    this.config = this.configService.config;
  }
}
