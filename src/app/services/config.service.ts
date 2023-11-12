import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';

import { Config } from '../config';

import { CONFIG_DEFAULT } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  config: Promise<Config> = this.storageService.get('config').then(config => config || CONFIG_DEFAULT);

  constructor(private storageService: StorageService) {

  }

  async updateConfig(partialConfig: Partial<Config>) {
    return this.storageService.set('config', {
      ...await this.config,
      ...partialConfig
    });
  }
}
