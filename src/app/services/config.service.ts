import { Injectable } from '@angular/core';

import { Config } from '../config';

import { AVATARS_USER, AVATARS_TAIL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  config: Config = (this.storageService.get('config') || {
    userName: AVATARS_USER[0].name,
    userIcon: AVATARS_USER[0].icon,

    tailName: AVATARS_TAIL[0].name,
    tailIcon: AVATARS_TAIL[0].icon,
  }) as Config;

  constructor() { }
}
