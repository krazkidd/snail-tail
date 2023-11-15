import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../shared/shared.module';
import { ErrorPageRoutingModule } from './error-routing.module';

import { ErrorPage } from './error.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ErrorPageRoutingModule,
  ],
  declarations: [ErrorPage]
})
export class ErrorPageModule {}
