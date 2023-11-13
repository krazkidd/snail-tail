import { EventEmitter, Injectable, Output } from '@angular/core';

import { StorageService } from './storage.service';

import { Config } from '../config';

import { CONFIG_DEFAULT } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  @Output()
  configChanged = new EventEmitter();

  constructor(private storageService: StorageService) {

  }

  async getConfig() {
    return this.storageService.get('config').then(c => c || CONFIG_DEFAULT);
  }

  async setConfig(partialConfig: Partial<Config>) {
    await this.storageService.set('config', {
      ...await this.getConfig(),
      ...partialConfig
    });

    this.configChanged.emit();
  }
}
