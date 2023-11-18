import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { StorageService } from './storage.service';

import { Config } from '../config';

import { CONFIG_DEFAULT } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  config$ = new BehaviorSubject(CONFIG_DEFAULT);

  constructor(private storageService: StorageService) {
    setTimeout(async () => {
      const storedConfig = await this.getConfig();

      if (storedConfig) {
        this.config$.next(storedConfig);
      }
    });
  }

  async getConfig() {
    return this.storageService.get('config').then(c => c || CONFIG_DEFAULT);
  }

  async setConfig(partialConfig: Partial<Config>) {
    const config = {
      ...await this.getConfig(),
      ...partialConfig
    };

    await this.storageService.set('config', config);

    this.config$.next(config);
  }
}
