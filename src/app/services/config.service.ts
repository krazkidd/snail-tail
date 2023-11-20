import { Injectable } from '@angular/core';
import { ReplaySubject, firstValueFrom } from 'rxjs';

import { StorageService } from './storage.service';

import { Config } from '../config';

import { CONFIG_DEFAULT } from '../constants';

const STORAGE_KEY = 'config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  config$ = new ReplaySubject<Config>(1);

  constructor(private storageService: StorageService) {
    setTimeout(async () => this.config$.next(await this.getConfig()));
  }

  async getConfig() {
    return await this.storageService.get(STORAGE_KEY) || CONFIG_DEFAULT;
  }

  async setConfig(partialConfig: Partial<Config>) {
    const config = {
      ...(await firstValueFrom(this.config$)),
      ...partialConfig
    };

    await this.storageService.set(STORAGE_KEY, config);

    this.config$.next(config);
  }
}
