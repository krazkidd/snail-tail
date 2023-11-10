import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StepCounterService {
  @Output()
  stepsCounted = new EventEmitter<{ userSteps: number, tailSteps: number }>()

  //TODO get from hardware step counter
  userSteps: number = 100;
  tailSteps: number = 0;

  intervalId: number | null = null;

  constructor() {
    //const isAvailable = Capacitor.isPluginAvailable('TODO step counter');

    this.intervalId = setInterval(() => {
      this.tailSteps++;

      this.stepsCounted.emit({ userSteps: this.userSteps, tailSteps: this. tailSteps });
    }, 1000);
  }

}
