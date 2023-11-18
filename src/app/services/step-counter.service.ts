import { EventEmitter, Injectable, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { ConfigService } from './config.service';

import { AVATARS_TAIL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class StepCounterService implements OnDestroy {
  @Output()
  stepsCounted = new EventEmitter<{
    userSteps: number,
    tailSteps: number,
    estimatedTimeRemaining_m: number,
  }>();
  @Output()
  userCaught = new EventEmitter();

  userSteps: number = 0;
  tailSteps: number = 0;

  isUserCaught = false;

  private _configSub: Subscription | null = null;
  private _intervalId: number | undefined = undefined;

  constructor(private configService: ConfigService) {

  }

  ngOnDestroy() {
    this.stopChase();
  }

  async startChase() {
    this.stopChase();

    //TODO we can determine initial steps by defining some "head start" time like some number of days
    this.userSteps = 100;
    this.tailSteps = 0;

    this.isUserCaught = false;

    this._configSub = this.configService.config$.subscribe(config => {
      clearInterval(this._intervalId);

      // how long it takes the tail to cover the user's stride length
      const tailStepTime_m = config.userStrideLength_m / (this.getAvatar(config.tailIcon).velocityKph * 1000) * 60;

      // update subscribers with initial values
      this.stepsCounted.emit({
        userSteps: this.userSteps,
        tailSteps: this.tailSteps,
        estimatedTimeRemaining_m: Math.floor((this.userSteps - this.tailSteps) * tailStepTime_m),
      });

      this._intervalId = setInterval(() => {
        this.tailSteps++;

        this.stepsCounted.emit({
          userSteps: this.userSteps,
          tailSteps: this.tailSteps,
          estimatedTimeRemaining_m: Math.floor((this.userSteps - this.tailSteps) * tailStepTime_m),
        });

        if (this.tailSteps >= this.userSteps) {
          this.stopChase();

          this.isUserCaught = true;

          this.userCaught.emit();
        }
      }, tailStepTime_m * 60 * 1000);
    });
  }

  stopChase() {
    clearInterval(this._intervalId);

    this._configSub = this._configSub?.unsubscribe() || null;
  }

  getAvatar(tailIcon: string) {
    //TODO we shouldn't have to .find() the avatar; put this in ConfigService
    return AVATARS_TAIL.find(t => t.icon === tailIcon)!;
  }
}
