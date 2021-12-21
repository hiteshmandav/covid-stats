import { StatesComponent } from './components/states/states.component';
import { VaccineComponent } from './components/vaccine/vaccine.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: '',
  component: HomeComponent
},{
  path: 'home',
  component: HomeComponent
},{
  path: 'vaccine',
  loadChildren: () => import('./components/vaccine/vaccine.module').then(m => m.VaccineModule)
},{
  path: 'states',
   loadChildren: () => import('./components/states/states.module').then(m => m.StatesModule)
},{
  path: '**',
  component: HomeComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
