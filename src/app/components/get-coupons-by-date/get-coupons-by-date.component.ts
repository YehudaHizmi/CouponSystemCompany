import { MessageService } from 'primeng/api';
import { WebApiCompanyService } from './../../services/web-api-company.service';
import { Component, OnInit } from '@angular/core';
import { Coupon } from '../common/Coupon';

@Component({
  selector: 'app-get-coupons-by-date',
  templateUrl: './get-coupons-by-date.component.html',
  styleUrls: ['./get-coupons-by-date.component.css']
})
export class GetCouponsByDateComponent implements OnInit {

  coupons: Coupon[] = [];
  cols: any[];
  numOfCoupons: number;
  caption = 'Coupons By Date';
  date: Date;
  hasData = false;
  // defaultDate: string;

  /*
  At the constructor we inject
  1. WebApiAdminService for the favor of the services
  2. MessageService for the favor of the custom messages
  */
  constructor(private companyService: WebApiCompanyService, private messageService: MessageService) {
    this.cols = companyService.couponCols;
  }

  ngOnInit() {
  }

  // This method is activated (by event) every time the user select a date.
  // It activate the getCouponByDateService service that presnet the relevant data to the user
  onSelectDate(event) {
   this.companyService.getCouponByDateService(this.date.getFullYear() + '-' + (this.date.getMonth() + 1)  + '-' + this.date.getDate())
    .subscribe (
      (resp) => {
          this.hasData = true;
          this.coupons = resp.json();
          this.numOfCoupons = this.coupons.length;
          this.coupons.sort((a: any, b: any) => {
            if (a.title < b.title) {
              return -1;
            } else if (a.title > b.title) {
              return 1;
            } else {
              return 0;
            }
        });
      },
      (error) => {
        // this.messageService.add({severity: 'error', summary: 'Data Unavailable', detail: error._body});
        this.messageService.add({severity: 'error', summary: 'Data Unavailable', detail: 'There aren\'t any listed coupons '
         + 'with an end date less than ' +  this.date.getFullYear() + '-' + (this.date.getMonth() + 1)  + '-'
         + this.date.getDate()  + ' in the system '});
        });
  }

}
