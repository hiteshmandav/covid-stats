import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { VaccineComponent } from './vaccine.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VaccineRoutingModule } from './vaccine-routing.module';


@NgModule({
  declarations: [VaccineComponent],
  imports: [
    CommonModule,
    VaccineRoutingModule,
    MatProgressSpinnerModule,
  ]
})
export class VaccineModule { }
