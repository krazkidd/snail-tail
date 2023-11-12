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
  config: Promise<Config> = this.configService.config;

  userAvatars: UserAvatar[] = AVATARS_USER;
  tailAvatars: TailAvatar[] = AVATARS_TAIL;

  constructor(private configService: ConfigService) {

  }

  ngOnInit() {

  }

  async onChange(configProp: string, value: string | number | null | undefined) {
    await this.configService.updateConfig({ [configProp]: value as string });

    this.config = this.configService.config;
  }
}
