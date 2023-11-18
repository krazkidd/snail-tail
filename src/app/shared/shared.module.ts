import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppHeaderComponent } from './app-header/app-header.component';
import { AppHeaderCondensedComponent } from './app-header-condensed/app-header-condensed.component';
@NgModule({
  declarations: [
    AppHeaderComponent,
    AppHeaderCondensedComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [
    AppHeaderComponent,
    AppHeaderCondensedComponent,
  ]
})
export class SharedModule { }
