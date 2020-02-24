import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EprocTecRoutingModule } from './eproc-tec-routing.module';
import { EprocTecComponent } from './eproc-tec.component';

import { MaterialModule } from './../../material.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [EprocTecComponent],
  imports: [
    CommonModule,
    EprocTecRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule
  ]
})
export class EprocTecModule { }
