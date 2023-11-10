import { Injectable } from '@angular/core';

import { Config } from '../config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  config: Config = new Config();

  constructor() { }
}
