import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { ConfigService } from './config.service';

import { AVATARS_TAIL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class StepCounterService implements OnDestroy {
  stepsCounted$ = new BehaviorSubject<{
    userSteps: number,
    tailSteps: number,
    isUserCaught: boolean,
    estimatedTimeRemaining_m: number,
  }>({
    userSteps: 0,
    tailSteps: 0,
    isUserCaught: false,
    estimatedTimeRemaining_m: 0,
  });

  private _configSub: Subscription | null = null;
  private _intervalId: number | undefined = undefined;

  constructor(private configService: ConfigService) {

  }

  ngOnDestroy() {
    this.stopChase();
  }

  async startChase() {
    this.stopChase();

    this._configSub = this.configService.config$.subscribe(config => {
      clearInterval(this._intervalId);

      let userSteps = config.initialLead_km * 1000 / config.userStrideLength_m;
      let tailSteps = 0;

      // how long it takes the tail to cover the user's stride length
      const tailStepTime_m = config.userStrideLength_m / (this.getAvatar(config.tailIcon).velocity_kph * 1000) * 60;

      // update subscribers with initial values
      this.stepsCounted$.next({
        userSteps: userSteps,
        tailSteps: tailSteps,
        isUserCaught: false,
        estimatedTimeRemaining_m: Math.floor((userSteps - tailSteps) * tailStepTime_m),
      });

      this._intervalId = setInterval(() => {
        tailSteps++;

        const isUserCaught = tailSteps >= userSteps;

        this.stepsCounted$.next({
          userSteps: userSteps,
          tailSteps: tailSteps,
          isUserCaught,
          estimatedTimeRemaining_m: Math.floor((userSteps - tailSteps) * tailStepTime_m),
        });

        if (isUserCaught) {
          this.stopChase();
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
