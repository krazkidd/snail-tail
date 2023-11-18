import { EventEmitter, Injectable, Output } from '@angular/core';

import { ConfigService } from './config.service';

import { Config } from '../config';

import { AVATARS_TAIL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class StepCounterService {
  @Output()
  stepsCounted = new EventEmitter<{
    userSteps: number,
    tailSteps: number,
    estimatedTimeRemaining_m: number,
  }>();
  @Output()
  userCaught = new EventEmitter();

  config: Promise<Config> = this.configService.getConfig();

  userSteps: number = 0;
  tailSteps: number = 0;

  isUserCaught = false;

  private _intervalId: number | undefined = undefined;

  constructor(private configService: ConfigService) {
    //TODO do we need to update the chase timer when the config changes?
    this.configService.configChanged.subscribe(() => this.config = this.configService.getConfig());
  }

  async startChase() {
    //TODO we can determine initial steps by defining some "head start" time like some number of days
    this.userSteps = 100;
    this.tailSteps = 0;

    this.isUserCaught = false;

    setTimeout(async () => {
      // run once to update subscribers
      this.tailStep(true);

      const config = await this.config;

      //TODO we shouldn't have to .find() the avatar; put this in ConfigService
      const selectedTailAvatar = AVATARS_TAIL.find(t => t.icon === config.tailIcon)!;

      // how long it takes the tail to cover the user's stride length
      const tailStepTime_m = config.userStrideLength_m / (selectedTailAvatar.velocityKph * 1000) * 60;

      this._intervalId = setInterval(() => this.tailStep(), tailStepTime_m * 60 * 1000);
    });
  }

  // async userStep() {
  //   //TODO poll hardware step counter
  //   //const isAvailable = Capacitor.isPluginAvailable('TODO step counter');
  // }

  async tailStep(initialStep = false) {
    !initialStep && this.tailSteps++;

    this.stepsCounted.emit(await this.getStatus());

    if (this.tailSteps >= this.userSteps) {
      this.stopChase();

      this.isUserCaught = true;

      this.userCaught.emit();
    }
  }

  stopChase() {
    clearInterval(this._intervalId);
  }

  async getStatus() {
    const config = await this.config;

    //TODO we shouldn't have to .find() the avatar; put this in ConfigService
    const selectedTailAvatar = AVATARS_TAIL.find(t => t.icon === config.tailIcon)!;

    // how long it takes the tail to cover the user's stride length
    const tailStepTime_m = config.userStrideLength_m / (selectedTailAvatar.velocityKph * 1000) * 60;

    return {
      userSteps: this.userSteps,
      tailSteps: this.tailSteps,
      estimatedTimeRemaining_m: Math.floor((this.userSteps - this.tailSteps) * tailStepTime_m),
    };
  }
}
