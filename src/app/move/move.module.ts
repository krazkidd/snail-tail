import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovePageRoutingModule } from './move-routing.module';

import { MovePage } from './move.page';
import { StepCounterComponent } from './step-counter/step-counter.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovePageRoutingModule,
  ],
  declarations: [
    MovePage,
    StepCounterComponent
  ],
  providers: []
})
export class MovePageModule {}
