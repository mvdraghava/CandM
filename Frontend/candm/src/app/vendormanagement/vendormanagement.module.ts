import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendormanagementRoutingModule } from './vendormanagement-routing.module';
import { VendormanagementComponent } from './vendormanagement.component';
import { CreatevendorComponent } from './createvendor/createvendor.component';

import { ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AddvendordialogComponent } from './addvendordialog/addvendordialog.component';
import { FiltervendorsComponent } from './filtervendors/filtervendors.component';
import { DisplayvendorsComponent } from './displayvendors/displayvendors.component';

import { InfiniteScrollModule } from '../../../node_modules/ngx-infinite-scroll';


@NgModule({
  declarations: [VendormanagementComponent, CreatevendorComponent, AddvendordialogComponent, FiltervendorsComponent, DisplayvendorsComponent],
  imports: [
    CommonModule,
    VendormanagementRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    FlexLayoutModule
  ],
  entryComponents: [
    AddvendordialogComponent
  ],
})
export class VendormanagementModule { }
