import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StepCounterService {
  @Output()
  stepsCounted = new EventEmitter<{ userSteps: number, tailSteps: number }>()
  @Output()
  userCaught = new EventEmitter()

  userSteps: number = 0;
  tailSteps: number = 0;

  isUserCaught = false;

  _intervalId: number | undefined = undefined;

  constructor() {

  }

  startChase() {
    //TODO we can determine initial steps by defining some "head start" time like some number of days
    this.userSteps = 100;
    this.tailSteps = 0;

    this.isUserCaught = false;

    this._intervalId = setInterval(() => {
      //TODO poll hardware step counter
      //const isAvailable = Capacitor.isPluginAvailable('TODO step counter');

      //TODO increment by time diff * velocity
      this.tailSteps++;

      this.stepsCounted.emit({ userSteps: this.userSteps, tailSteps: this. tailSteps });

      if (this.tailSteps >= this.userSteps) {
        this.stopChase();

        this.isUserCaught = true;

        this.userCaught.emit();
      }
    }, 1000);
  }

  stopChase() {
    clearInterval(this._intervalId);
  }

}
