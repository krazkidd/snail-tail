import { Component, } from '@angular/core';

import { ConfigService } from '../services/config.service';

import { UserAvatar } from '../user-avatar';
import { TailAvatar } from '../tail-avatar';

import { AVATARS_USER, AVATARS_TAIL } from '../constants';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.page.html',
  styleUrls: ['./preferences.page.scss'],
})
export class PreferencesPage {
  config$ = this.configService.config$;

  userAvatars: Record<string, UserAvatar> = AVATARS_USER;
  tailAvatars: Record<string, TailAvatar> = AVATARS_TAIL;

  constructor(private configService: ConfigService) {

  }

  onChange(configProp: string, value: string | number | null | undefined) {
    if (configProp === 'userStrideLength_m') {
      // clamp stride length
      value = String(Math.max(0.1, Math.min(3.0, value as number)));
    } else if (configProp === 'initialLead_km') {
      // clamp initial lead
      value = String(Math.max(0.1, Math.min(1000.0, value as number)));
    }

    this.configService.setConfig({ [configProp]: value });
  }
}
