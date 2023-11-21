import { Injectable, OnDestroy } from '@angular/core';
import { ReplaySubject, Subscription, firstValueFrom } from 'rxjs';

import { StorageService } from './storage.service';
import { ConfigService } from './config.service';

import { Config } from '../config';

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
      const { userSteps, tailSteps, lastStepTimestamp, timerState } = await this.getSteps();

      this.userSteps = userSteps;
      this.tailSteps = tailSteps;
      this.lastStepTimestamp = lastStepTimestamp;

      this.isUserCaught = this.tailSteps >= this.userSteps;

      this.updateSteps(await firstValueFrom(this.configService.config$));

      await this.changeMode(timerState);
    });
  }

  ngOnDestroy() {
    this._configSub?.unsubscribe();
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

  updateSteps(config: Config) {
    const { tailStepTime_m } = this.getTailStepTime(config);

    // update subscribers with initial values
    this.stepsCounted$.next({
      userSteps: this.userSteps,
      tailSteps: this.tailSteps,
      isUserCaught: this.isUserCaught,
      estimatedTimeRemaining_m: Math.floor((this.userSteps - this.tailSteps) * tailStepTime_m),
    });
  }

  async changeMode(newTimerState: 'started' | 'paused' | 'stopped') {
    clearInterval(this._intervalId);

    this._configSub = this._configSub?.unsubscribe() || null;

    if (newTimerState === 'started') {
      const currentTimerState = await firstValueFrom(this.timerState$);

      this.startChase(currentTimerState);
    }

    this.timerState$.next(newTimerState);

    return this.setSteps();
  }

  startChase(timerState: 'started' | 'paused' | 'stopped') {
    this._configSub = this.configService.config$.subscribe(async (config) => {
      clearInterval(this._intervalId);

      if (this.isUserCaught || timerState === 'stopped') {
        // reset steps when restarting from stopped state

        this.userSteps = config.initialLead_km * 1000 / config.userStrideLength_m;
        this.tailSteps = 0;
        this.lastStepTimestamp = Date.now();

        this.isUserCaught = false;

        this.updateSteps(config);
      } else if (timerState === 'paused') {
        // reset last step time when resuming from paused state

        this.lastStepTimestamp = Date.now();
      }

      const { tailStepTime_ms } = this.getTailStepTime(config);

      this._intervalId = setInterval(async () => {
        // update subscribers if tail has gained one or more whole steps

        const tailSteps = Math.floor((Date.now() - this.lastStepTimestamp) / tailStepTime_ms);

        if (tailSteps > 0) {
          this.tailSteps += tailSteps;
          this.lastStepTimestamp += tailStepTime_ms * tailSteps;

          if (this.tailSteps >= this.userSteps) {
            this.isUserCaught = true;

            await this.changeMode('paused');
          }

          this.updateSteps(config);
        }
      }, Math.max(1000, tailStepTime_ms));
    });
  }

  getTailStepTime(config: Config): { tailStepTime_m: number, tailStepTime_ms: number } {
    // how long it takes the tail to cover the user's stride length
    const tailStepTime_m = config.userStrideLength_m / (AVATARS_TAIL[config.tailIcon].velocity_kph * 1000) * 60;
    const tailStepTime_ms = tailStepTime_m * 60 * 1000;

    return {
      tailStepTime_m,
      tailStepTime_ms,
    };
  }
}
