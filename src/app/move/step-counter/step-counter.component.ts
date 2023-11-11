import { Component, OnInit } from '@angular/core';

import { StepCounterService } from '../../services/step-counter.service';

@Component({
  selector: 'app-step-counter',
  templateUrl: './step-counter.component.html',
  styleUrls: ['./step-counter.component.scss'],
})
export class StepCounterComponent  implements OnInit {
  userSteps: number = this.stepCounter.userSteps;
  tailSteps: number = this.stepCounter.tailSteps;

  constructor(private stepCounter: StepCounterService)
  {

  }

  ngOnInit(): void {
    this.stepCounter.stepsCounted.subscribe(({ userSteps, tailSteps }) => {
      this.userSteps = userSteps;
      this.tailSteps = tailSteps;
    });
  }

}
