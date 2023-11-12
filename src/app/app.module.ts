import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Drivers, Storage } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage-angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ConfigService } from './services/config.service';
import { StepCounterService } from './services/step-counter.service';
import { StorageService } from './services/storage.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: [Drivers.LocalStorage]
    }),
    AppRoutingModule,
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    ConfigService,
    StepCounterService,
    StorageService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
