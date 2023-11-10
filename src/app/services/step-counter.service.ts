import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StepCounterService {
  @Output()
  stepsCounted = new EventEmitter<number>()

  steps: number = 0;

  intervalId: number | null = null;

  constructor() {
    this.intervalId = setInterval(() => {
      this.steps++;

      this.stepsCounted.emit(this.steps);
    }, 1000);

    //const isAvailable = Capacitor.isPluginAvailable('TODO');
  }

}
