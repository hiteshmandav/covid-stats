import { StatesComponent } from './states.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatesRoutingModule } from './states-routing.module';


import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatGridListModule} from '@angular/material/grid-list';



@NgModule({
  declarations: [StatesComponent],
  imports: [
    CommonModule,
    StatesRoutingModule,
    MatProgressSpinnerModule,
    MatGridListModule,
  ]
})
export class StatesModule { }
