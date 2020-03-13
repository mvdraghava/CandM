import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaindetailsRoutingModule } from './maindetails-routing.module';
import { MaindetailsComponent } from './maindetails.component';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { MaterialModule } from './../material.module';
import { SafePipeModule } from 'safe-pipe';

import { SidenavComponent } from './sidenav/sidenav.component';
import { ShowfilesComponent } from './showfiles/showfiles.component';
import { UploadfilesComponent } from './uploadfiles/uploadfiles.component';
import { CandmmsgComponent } from './candmmsg/candmmsg.component';
import { ParticipatedvendorsComponent } from './participatedvendors/participatedvendors.component';

import { StepprogressbarModule } from './../stepprogressbar/stepprogressbar.module';


@NgModule({
  declarations: [MaindetailsComponent, SidenavComponent, ShowfilesComponent, UploadfilesComponent, CandmmsgComponent, ParticipatedvendorsComponent],
  imports: [
    CommonModule,
    MaindetailsRoutingModule,
    StepprogressbarModule,
    MatSidenavModule,
    MatCardModule,
    FlexLayoutModule,
    SafePipeModule,
    MatButtonModule,
    MaterialModule,
    MatMenuModule
  ]
})
export class MaindetailsModule { }
