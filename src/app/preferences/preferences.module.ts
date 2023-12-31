import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../shared/shared.module';
import { PreferencesPageRoutingModule } from './preferences-routing.module';

import { PreferencesPage } from './preferences.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PreferencesPageRoutingModule
  ],
  declarations: [PreferencesPage]
})
export class PreferencesPageModule {}
