import { Injectable, OnDestroy } from '@angular/core';
import { ReplaySubject, Subscription, firstValueFrom } from 'rxjs';

import { StorageService } from './storage.service';
import { ConfigService } from './config.service';

import { AVATARS_TAIL } from '../constants';

const STORAGE_KEY = 'step_counter';

@Injectable({
  providedIn: 'root'
})
export class StepCounterService implements OnDestroy {
  timerState$ = new ReplaySubject<'started' | 'paused' | 'stopped'>(1);

  stepsCounted$ = new ReplaySubject<{
    userSteps: number,
    tailSteps: number,
    isUserCaught: boolean,
    estimatedTimeRemaining_m: number,
  }>(1);

  private userSteps = 0;
  private tailSteps = 0;
  private lastStepTimestamp = 0;

  private isUserCaught = false;

  private _configSub: Subscription | null = null;
  private _intervalId: number | undefined = undefined;

  constructor(private storageService: StorageService, private configService: ConfigService) {
    setTimeout(async () => {
      const config = await firstValueFrom(this.configService.config$);

      // how long it takes the tail to cover the user's stride length
      const tailStepTime_m = config.userStrideLength_m / (AVATARS_TAIL[config.tailIcon].velocity_kph * 1000) * 60;
      const tailStepTime_ms = tailStepTime_m * 60 * 1000;

      const { userSteps, tailSteps, lastStepTimestamp, timerState } = await this.getSteps();

      this.userSteps = userSteps;
      this.tailSteps = tailSteps;
      this.lastStepTimestamp = lastStepTimestamp;
      this.isUserCaught = this.tailSteps >= this.userSteps;

      // update subscribers with initial values
      this.stepsCounted$.next({
        userSteps: this.userSteps,
        tailSteps: this.tailSteps,
        isUserCaught: this.isUserCaught,
        estimatedTimeRemaining_m: Math.floor((this.userSteps - this.tailSteps) * tailStepTime_m),
      });

      this.changeMode(timerState);
    });
  }

  ngOnDestroy() {
    this.changeMode('stopped');
  }

  async getSteps() {
    return await this.storageService.get(STORAGE_KEY) || {
      userSteps: 0,
      tailSteps: 0,
      lastStepTimestamp: 0,
      timerState: 'stopped',
    };
  }

  async setSteps() {
    return this.storageService.set(STORAGE_KEY, {
      userSteps: this.userSteps,
      tailSteps: this.tailSteps,
      lastStepTimestamp: this.lastStepTimestamp,
      timerState: await firstValueFrom(this.timerState$),
    });
  }

  changeMode(timerState: 'started' | 'paused' | 'stopped') {
    clearInterval(this._intervalId);

    this._configSub = this._configSub?.unsubscribe() || null;

    if (timerState === 'started') {
      this.startChase();
    }

    this.timerState$.next(timerState);

    this.setSteps();
  }

  startChase() {
    this._configSub = this.configService.config$.subscribe(async (config) => {
      clearInterval(this._intervalId);

      // how long it takes the tail to cover the user's stride length
      const tailStepTime_m = config.userStrideLength_m / (AVATARS_TAIL[config.tailIcon].velocity_kph * 1000) * 60;
      const tailStepTime_ms = tailStepTime_m * 60 * 1000;

      // reset steps when restarting from stopped state
      if (this.isUserCaught || await firstValueFrom(this.timerState$) === 'stopped') {
        this.userSteps = config.initialLead_km * 1000 / config.userStrideLength_m;
        this.tailSteps = 0;
        this.lastStepTimestamp = Date.now();
        this.isUserCaught = false;

        // update subscribers with initial values
        this.stepsCounted$.next({
          userSteps: this.userSteps,
          tailSteps: this.tailSteps,
          isUserCaught: this.isUserCaught,
          estimatedTimeRemaining_m: Math.floor((this.userSteps - this.tailSteps) * tailStepTime_m),
        });
      } else if (await firstValueFrom(this.timerState$) === 'paused') {
        this.lastStepTimestamp = Date.now();
      }

      this._intervalId = setInterval(() => {
        const tailSteps = Math.floor((Date.now() - this.lastStepTimestamp) / tailStepTime_ms);

        if (tailSteps > 0) {
          this.tailSteps += tailSteps;
          this.lastStepTimestamp += tailStepTime_ms * tailSteps;

          if (this.tailSteps >= this.userSteps) {
            this.isUserCaught = true;

            this.changeMode('paused');
          }

          this.stepsCounted$.next({
            userSteps: this.userSteps,
            tailSteps: this.tailSteps,
            isUserCaught: this.isUserCaught,
            estimatedTimeRemaining_m: Math.floor((this.userSteps - this.tailSteps) * tailStepTime_m),
          });
        }
      }, Math.max(1000, tailStepTime_ms));
    });
  }
}
