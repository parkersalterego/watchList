import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { LogRegComponent } from '../../components/log-reg/log-reg.component';

const appRoutes: Routes = [
  {
    path: '',
    component: LogRegComponent
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
