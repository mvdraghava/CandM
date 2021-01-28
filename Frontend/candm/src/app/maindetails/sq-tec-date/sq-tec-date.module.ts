import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SqTecDateRoutingModule } from './sq-tec-date-routing.module';
import { SqTecDateComponent } from './sq-tec-date.component';
import { MaterialModule } from './../../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { FormcomponentsModuleModule } from './../../formcomponents-module/formcomponents-module.module';

@NgModule({
  declarations: [SqTecDateComponent],
  imports: [
    CommonModule,
    SqTecDateRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    FormcomponentsModuleModule
  ]
})
export class SqTecDateModule { }
