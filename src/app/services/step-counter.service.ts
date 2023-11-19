import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { ConfigService } from './config.service';

import { AVATARS_TAIL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class StepCounterService implements OnDestroy {
  timerState$ = new BehaviorSubject<'started' | 'paused' | 'stopped'>('stopped');

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

  private userSteps = 0;
  private tailSteps = 0;
  private isUserCaught = false;

  private _configSub: Subscription | null = null;
  private _intervalId: number | undefined = undefined;

  constructor(private configService: ConfigService) {

  }

  ngOnDestroy() {
    this.stopChase();
  }

  startChase() {
    this._configSub = this.configService.config$.subscribe(config => {
      clearInterval(this._intervalId);

      // reset steps when restarting from stopped state
      if (this.isUserCaught || this.timerState$.getValue() === 'stopped') {
        this.userSteps = config.initialLead_km * 1000 / config.userStrideLength_m;
        this.tailSteps = 0;
        this.isUserCaught = false;
      }

      // how long it takes the tail to cover the user's stride length
      const tailStepTime_m = config.userStrideLength_m / (AVATARS_TAIL[config.tailIcon].velocity_kph * 1000) * 60;

      // update subscribers with initial values
      this.stepsCounted$.next({
        userSteps: this.userSteps,
        tailSteps: this.tailSteps,
        isUserCaught: this.isUserCaught,
        estimatedTimeRemaining_m: Math.floor((this.userSteps - this.tailSteps) * tailStepTime_m),
      });

      this._intervalId = setInterval(() => {
        this.tailSteps++;

        if (this.tailSteps >= this.userSteps) {
          this.isUserCaught = true;

          this.pauseChase();
        }

        this.stepsCounted$.next({
          userSteps: this.userSteps,
          tailSteps: this.tailSteps,
          isUserCaught: this.isUserCaught,
          estimatedTimeRemaining_m: Math.floor((this.userSteps - this.tailSteps) * tailStepTime_m),
        });
      }, tailStepTime_m * 60 * 1000);
    });

    this.timerState$.next('started');
  }

  pauseChase() {
    clearInterval(this._intervalId);

    this._configSub = this._configSub?.unsubscribe() || null;

    this.timerState$.next('paused');
  }

  stopChase() {
    clearInterval(this._intervalId);

    this._configSub = this._configSub?.unsubscribe() || null;

    this.timerState$.next('stopped');
  }
}
