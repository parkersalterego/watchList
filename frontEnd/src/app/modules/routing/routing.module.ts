import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { LogRegComponent } from '../../components/log-reg/log-reg.component';
import { DahboardComponent } from '../../components/dahboard/dahboard.component';

const appRoutes: Routes = [
  {
    path: '',
    component: LogRegComponent
  },
  {
    path: 'dashboard',
    component: DahboardComponent
  }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  declarations: []
})

export class RoutingModule { }
