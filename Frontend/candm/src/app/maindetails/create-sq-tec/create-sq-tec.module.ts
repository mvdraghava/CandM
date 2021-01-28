import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateSqTecRoutingModule } from './create-sq-tec-routing.module';
import { CreateSqTecComponent } from './create-sq-tec.component';
import { MaterialModule } from './../../material.module';
import { AddvendordialogComponent } from './../../vendormanagement/addvendordialog/addvendordialog.component';
import { VendormanagementModule } from './../../vendormanagement/vendormanagement.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import { FormcomponentsModuleModule } from './../../formcomponents-module/formcomponents-module.module';


@NgModule({
  declarations: [CreateSqTecComponent],
  imports: [
    CommonModule,
    CreateSqTecRoutingModule,
    MaterialModule,
    MatDialogModule,
    VendormanagementModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    FormcomponentsModuleModule
  ],
  entryComponents: [
    AddvendordialogComponent
  ],
})
export class CreateSqTecModule { }
