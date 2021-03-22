import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainlayoutComponent } from './mainlayout/mainlayout.component';
import { TopbarComponent } from './topbar/topbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateBidComponent } from './create-bid/create-bid.component';
import { OpenBidsComponent } from './open-bids/open-bids.component';
import { CloseBidsComponent } from './close-bids/close-bids.component';
import { ReportComponent } from './report/report.component';
import { MaterialModule } from './material.module';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { LteformComponent } from './lteform/lteform.component';
import { OtformComponent } from './otform/otform.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { CreateTenderComponent } from './create-tender/create-tender.component';
import { CreateOtComponent } from './create-ot/create-ot.component';
import { CreateAmmendmentComponent } from './create-ammendment/create-ammendment.component';
import { FilterBidsComponent } from './filter-bids/filter-bids.component';
import { DisplayBidsComponent } from './display-bids/display-bids.component';
import { StepprogressbarModule } from './stepprogressbar/stepprogressbar.module';
import { FormcomponentsModuleModule } from './formcomponents-module/formcomponents-module.module';
import { ErrorcomponentComponent } from './errorcomponent/errorcomponent.component';

@NgModule({
  declarations: [
    AppComponent,
    MainlayoutComponent,
    TopbarComponent,
    NavbarComponent,
    DashboardComponent,
    CreateBidComponent,
    OpenBidsComponent,
    CloseBidsComponent,
    ReportComponent,
    LteformComponent,
    OtformComponent,
    CreateTenderComponent,
    CreateOtComponent,
    CreateAmmendmentComponent,
    FilterBidsComponent,
    DisplayBidsComponent,
    ErrorcomponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    RouterModule.forRoot([
      { path: '', component: OpenBidsComponent },
      { path: 'dashboard', component: DashboardComponent},
      { path: 'open-bids', component: OpenBidsComponent},
      { path: 'close-bids', component: CloseBidsComponent},
      { path: 'create-bid', component: CreateBidComponent},
      { path: 'report', component: ReportComponent},
      { path: 'create-tender', component: CreateTenderComponent},
      { path: 'create-OpenTender', component: CreateOtComponent},
      { path: 'create-Ammendment', component: CreateAmmendmentComponent},
    ]),
    StepprogressbarModule,
    FormcomponentsModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
