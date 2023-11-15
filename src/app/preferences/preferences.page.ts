import { Component, OnInit } from '@angular/core';

import { ConfigService } from '../services/config.service';

import { Config } from '../config';
import { UserAvatar } from '../user-avatar';
import { TailAvatar } from '../tail-avatar';

import { AVATARS_USER, AVATARS_TAIL } from '../constants';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.page.html',
  styleUrls: ['./preferences.page.scss'],
})
export class PreferencesPage implements OnInit {
  config: Promise<Config> = this.configService.getConfig();

  userAvatars: UserAvatar[] = AVATARS_USER;
  tailAvatars: TailAvatar[] = AVATARS_TAIL;

  constructor(private configService: ConfigService) {

  }

  ngOnInit() {
    this.configService.configChanged.subscribe(() => this.config = this.configService.getConfig());
  }

  onChange(configProp: string, value: string | number | null | undefined) {
    if (configProp === 'userStrideLength_m') {
      // clamp stride length
      value = String(Math.max(0.1, Math.min(3.0, value as number)));
    }

    this.configService.setConfig({ [configProp]: value as string });
  }
}
