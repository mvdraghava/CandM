import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { FormcomponentsModuleModule } from './../../formcomponents-module/formcomponents-module.module';

import { EditDetailsRoutingModule } from './edit-details-routing.module';
import { EditDetailsComponent } from './edit-details.component';


@NgModule({
  declarations: [EditDetailsComponent],
  imports: [
    CommonModule,
    EditDetailsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    FormcomponentsModuleModule,
    HttpClientModule
  ]
})
export class EditDetailsModule { }
