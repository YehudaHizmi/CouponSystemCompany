import { WebApiCompanyService } from './services/web-api-company.service';
import { BrowserModule, } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CompanyMainAreaComponent } from './components/company-main-area/company-main-area.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuModule } from 'primeng/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateCouponComponent } from './components/create-coupon/create-coupon.component';
import { RouterModule } from '@angular/router';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { HttpModule } from '@angular/http';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DialogContainerComponent } from './components/common/dialog-container/dialog-container.component';
import { GetCouponByIdComponent } from './components/get-coupon-by-id/get-coupon-by-id.component';
import { GetCompanyInfoComponent } from './components/get-company-info/get-company-info.component';
import { GetCouponsByPriceComponent } from './components/get-coupons-by-price/get-coupons-by-price.component';

import { SliderModule } from 'primeng/slider';
import { GetCouponsByDateComponent } from './components/get-coupons-by-date/get-coupons-by-date.component';
import { GetCouponsByTypeComponent } from './components/get-coupons-by-type/get-coupons-by-type.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    CompanyMainAreaComponent,
    HeaderComponent,
    CreateCouponComponent,
    DialogContainerComponent,
    GetCouponByIdComponent,
    GetCompanyInfoComponent,
    GetCouponsByPriceComponent,
    GetCouponsByDateComponent,
    GetCouponsByTypeComponent
  ],
  imports: [
    BrowserModule,
    MenuModule,
    BrowserAnimationsModule,
    FieldsetModule,
    InputTextModule,
    FormsModule,
    CalendarModule,
    ReactiveFormsModule,
    HttpModule,
    DropdownModule,
    TableModule,
    DialogModule,
    ToastModule,
    SliderModule,
    RouterModule.forRoot(
      [
        {
          path: 'allCoupons',
          component: CompanyMainAreaComponent
        },
        {
            path: 'addCoupon',
            component: CreateCouponComponent
        },
        {
          path: 'getCoupon',
          component: GetCouponByIdComponent
        },
        {
          path: 'companyInfo',
          component: GetCompanyInfoComponent
        },
        {
          path: 'getCouponsByPrice',
          component: GetCouponsByPriceComponent
        },
        {
          path: 'getCouponsByDate',
          component: GetCouponsByDateComponent
        },
        {
          path: 'getCouponsByType',
          component: GetCouponsByTypeComponent
        },
        {
          path: '',
          redirectTo: '/allCoupons',
          pathMatch: 'full'
      },
      ]
    )
  ],
  providers: [ WebApiCompanyService, MessageService, { provide: LocationStrategy, useClass: HashLocationStrategy } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
