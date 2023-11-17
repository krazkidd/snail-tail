import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { DATA_KEY } from './constants';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'move',
  },
  {
    path: 'move',
    loadChildren: () => import('./move/move.module').then( m => m.MovePageModule)
  },
  {
    path: 'preferences',
    loadChildren: () => import('./preferences/preferences.module').then( m => m.PreferencesPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./error/error.module').then( m => m.ErrorPageModule),
    data: {
      [DATA_KEY.ERROR_CODE]: 404,
      [DATA_KEY.MESSAGE]: 'Not Found'
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
