import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaindetailsRoutingModule } from './maindetails-routing.module';
import { MaindetailsComponent } from './maindetails.component';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

import { SidenavComponent } from './sidenav/sidenav.component';
import { ShowfilesComponent } from './showfiles/showfiles.component';
import { UploadfilesComponent } from './uploadfiles/uploadfiles.component';
import { CandmmsgComponent } from './candmmsg/candmmsg.component';


@NgModule({
  declarations: [MaindetailsComponent, SidenavComponent, ShowfilesComponent, UploadfilesComponent, CandmmsgComponent],
  imports: [
    CommonModule,
    MaindetailsRoutingModule,
    MatSidenavModule,
    MatCardModule,
    FlexLayoutModule,
    MatButtonModule
  ]
})
export class MaindetailsModule { }
