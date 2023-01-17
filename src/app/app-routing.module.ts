import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EasterCountdownComponent } from './easter-countdown/easter-countdown.component';
import { EasterSaturdayComponent } from './easter-saturday/easter-saturday.component';
import { EasterSundayComponent } from './easter-sunday/easter-sunday.component';
import { GoodFridayComponent } from './good-friday/good-friday.component';

const routes: Routes = [
  { 
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
   },
   { 
    path: 'home', 
    component: AppComponent 
  },
  { 
    path: 'easterCountdown', 
    component: EasterCountdownComponent 
  },
  { 
    path: 'goodFriday', 
    component: GoodFridayComponent 
  },
  { 
    path: 'easterSaturday', 
    component: EasterSaturdayComponent 
  },
  { 
    path: 'easterSunday', 
    component: EasterSundayComponent 
  },
  { 
    path: '**', 
    component: AppComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    // scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
