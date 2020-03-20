import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { VendorClarrificationsRoutingModule } from './vendor-clarrifications-routing.module';
import { VendorClarrificationsComponent } from './vendor-clarrifications.component';


@NgModule({
  declarations: [VendorClarrificationsComponent],
  imports: [
    CommonModule,
    VendorClarrificationsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
  ]
})
export class VendorClarrificationsModule { }
