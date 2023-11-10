import { Component, OnInit } from '@angular/core';

import { ConfigService } from '../services/config.service';

import { Config } from '../config.model';

@Component({
  selector: 'app-move',
  templateUrl: './move.page.html',
  styleUrls: ['./move.page.scss'],
})
export class MovePage implements OnInit {
  config: Config = this.configService.config;

  constructor(private configService: ConfigService) { }

  ngOnInit() {
  }

}
