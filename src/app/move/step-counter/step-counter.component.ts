import { Component, OnInit } from '@angular/core';

import { StepCounterService } from '../../services/step-counter.service';

@Component({
  selector: 'app-step-counter',
  templateUrl: './step-counter.component.html',
  styleUrls: ['./step-counter.component.scss'],
})
export class StepCounterComponent  implements OnInit {
  steps: number = this.stepCounter.steps;

  constructor(private stepCounter: StepCounterService)
  {

  }

  ngOnInit(): void {
    this.stepCounter.stepsCounted.subscribe(steps => this.steps = steps);
  }

}
