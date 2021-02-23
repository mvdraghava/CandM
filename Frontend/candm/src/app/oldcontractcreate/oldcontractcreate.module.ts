import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OldcontractcreateRoutingModule } from './oldcontractcreate-routing.module';
import { OldcontractcreateComponent } from './oldcontractcreate.component';
import { MaterialModule } from './../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { FormcomponentsModuleModule } from './../formcomponents-module/formcomponents-module.module';

@NgModule({
  declarations: [OldcontractcreateComponent],
  imports: [
    CommonModule,
    OldcontractcreateRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    FormcomponentsModuleModule
  ]
})
export class OldcontractcreateModule { }
