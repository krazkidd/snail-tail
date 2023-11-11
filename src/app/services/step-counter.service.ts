import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StepCounterService {
  @Output()
  stepsCounted = new EventEmitter<{ userSteps: number, tailSteps: number }>()
  @Output()
  userCaught = new EventEmitter()

  //TODO get from hardware step counter
  userSteps: number = 100;
  tailSteps: number = 0;

  isUserCaught = false;

  _intervalId: number | undefined = undefined;

  constructor() {
    this._intervalId = setInterval(() => {
      //TODO poll hardware step counter
      //const isAvailable = Capacitor.isPluginAvailable('TODO step counter');

      this.tailSteps++;

      this.stepsCounted.emit({ userSteps: this.userSteps, tailSteps: this. tailSteps });

      if (this.tailSteps >= this.userSteps) {
        clearInterval(this._intervalId);

        this.isUserCaught = true;

        this.userCaught.emit();
      }
    }, 1000);
  }

}
