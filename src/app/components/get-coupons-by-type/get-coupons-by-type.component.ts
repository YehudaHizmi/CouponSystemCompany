import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { WebApiCompanyService } from 'src/app/services/web-api-company.service';
import { Coupon } from '../common/Coupon';

@Component({
  selector: 'app-get-coupons-by-type',
  templateUrl: './get-coupons-by-type.component.html',
  styleUrls: ['./get-coupons-by-type.component.css']
})
export class GetCouponsByTypeComponent implements OnInit {

  coupons: Coupon[] = [];
  cols: any[];
  types: any[];
  numOfCoupons: number;
  caption = 'Coupons By Type';
  hasData = false;

  /*
  At the constructor we inject
  1. WebApiAdminService for the favor of the services
  2. MessageService for the favor of the custom messages
  */
  constructor(private companyService: WebApiCompanyService, private messageService: MessageService ) {

    // this.hasData = companyService.hasData;
    this.cols = companyService.couponCols;
    this.types = companyService.couponTypes;

    // this.types = [
    //   {label: 'Resturant' , value: 'RESTURANT'},
    //   {label: 'Electricity', value: 'ELECTRICITY'},
    //   {label: 'Food', value: 'FOOD'},
    //   {label: 'Health', value: 'HEALTH'},
    //   {label: 'Sports', value: 'SPORTS'},
    //   {label: 'Camping', value: 'CAMPING'},
    //   {label: 'Travelling', value: 'TRAVELLING'},
    // ];

  }

  ngOnInit() {
    // this.cols = [
    //   { displayName: 'Id',          field: 'id'         },
    //   { displayName: 'Title',       field: 'title'      },
    //   { displayName: 'Start Date',  field: 'startDate'  },
    //   { displayName: 'End Date',    field: 'endDate'    },
    //   { displayName: 'Amount',      field: 'amount'     },
    //   { displayName: 'Type',        field: 'type'       },
    //   { displayName: 'Message',     field: 'message'    },
    //   { displayName: 'Price',       field: 'price'      },
    //   { displayName: 'Image',       field: 'image'      }
    // ];
  }

  // This method is activated (by event) every time the user changes the coupon type.
  // It activate the getCouponByTypeService service that presnet the relevant data to the user
  onTypeChange(event) {
    if ( event.value !== null) {
      this.companyService.getCouponByTypeService(event.value).subscribe (
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
          this.messageService.add({severity: 'error', summary: 'Data Unavailable', detail: error._body});
        });
  } else {
    this.coupons = [];
  }
}
}
